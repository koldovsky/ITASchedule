package com.ita.service;


import com.ita.dto.ITAGroupDto;


public interface ITAGroupService{

    public ITAGroupDto createGroup(ITAGroupDto groupDto);
    public ITAGroupDto updateGroup(ITAGroupDto groupDto);
    //public Collection<ITAGroup> findAll();

}