package com.ita.service;
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


    @Override
    public void createGroup(ITAGroupDto groupDto){
        List<User> users = new ArrayList<User>();
        List<String> usersFullNames = groupDto.getUsersFullNames();
        for(int i=0; i<usersFullNames.size(); i++){
            User user = userRepository.findByFullName(usersFullNames.get(i));
            users.add(user);
        }
        User creator = userRepository.findByFullName(groupDto.getCreatorFullName());
        ITAGroup group = new ITAGroup(groupDto.getTitle(),
                users,
                LocalDate.parse(groupDto.getStartDate()),
                LocalDate.parse(groupDto.getEndDate()),
                groupDto.getStudentsCount(),
                groupDto.getIsActive());
        group.setCreator(userRepository.findByFullName(groupDto.getCreatorFullName()));
        itaGroupRepository.save(group);
    }

}