package com.ita.service;
import com.ita.utils.exceptions.BrokenITAGroupObjectException;
import org.springframework.beans.factory.annotation.Autowired;
import com.ita.entity.ITAGroup;
import com.ita.dto.ITAGroupDto;
import com.ita.repository.UserRepository;
import com.ita.repository.ITAGroupRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;
import com.ita.entity.User;

@Service
public class ITAGroupServiceImpl implements ITAGroupService{

    @Autowired
    ITAGroupRepository itaGroupRepository;

    @Autowired
    UserRepository userRepository;


    public ITAGroup buildITAGroup(ITAGroupDto groupDto) throws BrokenITAGroupObjectException {
        try {
            List<User> users = new ArrayList<User>();
            List<String> usersFullNames = groupDto.getUsersFullNames();
            for (int i = 0; i < usersFullNames.size(); i++) {
                User user = userRepository.findByFullName(usersFullNames.get(i));
                users.add(user);
            }
            ITAGroup group = new ITAGroup(groupDto.getTitle(),
                    users,
                    LocalDate.parse(groupDto.getStartDate()),
                    LocalDate.parse(groupDto.getEndDate()),
                    groupDto.getStudentsCount(),
                    groupDto.getIsActive(),
                    userRepository.findByFullName(groupDto.getCreatorFullName()));
            group.setId(groupDto.getId());
            return group;
        }catch(Exception e){
            throw new BrokenITAGroupObjectException();
        }
    }

    @Override
    public ITAGroupDto createGroup(ITAGroupDto groupDto){
        if(groupDto.getId()!=null){
            return null;
        }
        ITAGroup newGroup = buildITAGroup(groupDto);
        itaGroupRepository.save(newGroup);
        return groupDto;
    }

    @Override
    public ITAGroupDto updateGroup(ITAGroupDto groupDto){
        ITAGroup group = itaGroupRepository.findOne(groupDto.getId());
        if(group==null){
            return null;
        }
        ITAGroup newGroup = buildITAGroup(groupDto);
        itaGroupRepository.save(newGroup);
        return groupDto;
    }

}