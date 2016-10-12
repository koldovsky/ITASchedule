package com.ita.service;
import com.ita.service.impl.ITAGroupService;
import com.ita.utils.exceptions.BrokenITAGroupObjectException;
import com.ita.utils.exceptions.ITAGroupValidationException;
import com.ita.utils.validators.ITAGroupValidator;
import org.springframework.beans.factory.annotation.Autowired;
import com.ita.entity.ITAGroup;
import com.ita.dto.ITAGroupDto;
import com.ita.repository.UserRepository;
import com.ita.repository.ITAGroupRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.ArrayList;
import com.ita.entity.User;
import com.ita.constants.ErrorConstants;
import org.springframework.validation.DataBinder;

@Service
public class ITAGroupServiceImpl implements ITAGroupService {

    @Autowired
    ITAGroupRepository itaGroupRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ITAGroupValidator itaGroupValidator;


    public ITAGroup buildITAGroup(ITAGroupDto groupDto) throws BrokenITAGroupObjectException {
        ITAGroup group = null;
        try {
            List<User> users = new ArrayList<User>();
            List<String> usersFullNames = groupDto.getUsersFullNames();
            for (int i = 0; i < usersFullNames.size(); i++) {
                User user = userRepository.findByFullName(usersFullNames.get(i));
                users.add(user);
            }
            group = new ITAGroup(groupDto.getTitle(),
                    users,
                    LocalDate.parse(groupDto.getStartDate()),
                    LocalDate.parse(groupDto.getEndDate()),
                    groupDto.getStudentsCount(),
                    groupDto.getIsActive(),
                    userRepository.findByFullName(groupDto.getCreatorFullName()));
            group.setId(groupDto.getId());

            DataBinder binder = new DataBinder(group);
            binder.setValidator(itaGroupValidator);
            binder.validate();
            if (binder.getBindingResult().hasErrors()){
                throw new ITAGroupValidationException(binder.getBindingResult());
            }



        }catch(DateTimeParseException | NullPointerException e1){
            e1.printStackTrace();
            throw new BrokenITAGroupObjectException();
        }catch(ITAGroupValidationException e2){
            e2.printStackTrace();
            throw e2;
        }
        return group;
    }

    @Override
    public ITAGroupDto createGroup(ITAGroupDto groupDto) throws IllegalArgumentException{
        if(groupDto.getId()!=null){
            throw new IllegalArgumentException(String.format(ErrorConstants.OBJECT_ID_EXISTS,groupDto.getId()));
        }
        ITAGroup newGroup = buildITAGroup(groupDto);
        itaGroupRepository.save(newGroup);
        return groupDto;
    }

    @Override
    public ITAGroupDto updateGroup(ITAGroupDto groupDto)  throws IllegalArgumentException{
        ITAGroup group = itaGroupRepository.findOne(groupDto.getId());
        if(group==null){
            throw new IllegalArgumentException(String.format(ErrorConstants.OBJECT_ID_NOT_FOUND,group.getId()));
        }
        ITAGroup newGroup = buildITAGroup(groupDto);
        itaGroupRepository.save(newGroup);
        return groupDto;
    }

}