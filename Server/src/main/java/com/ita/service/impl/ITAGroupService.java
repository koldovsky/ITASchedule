package com.ita.service.impl;


import com.ita.dto.ITAGroupDto;


public interface ITAGroupService{

    public ITAGroupDto createGroup(ITAGroupDto groupDto);
    public ITAGroupDto updateGroup(ITAGroupDto groupDto);
    //public Collection<ITAGroup> findAll();

}