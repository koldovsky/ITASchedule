package com.ita.utils.assemblers;

import com.ita.controller.ITAGroupController;
import com.ita.entity.ITAGroup;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.mvc.ResourceAssemblerSupport;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;


/**
 * Created by marian on 14.10.16.
 */
@Component
public class ITAGroupResourceAssembler extends ResourceAssemblerSupport<ITAGroup,Resource> {

    public ITAGroupResourceAssembler(){
        super(ITAGroupController.class, Resource.class);
    }
    @Override
    public List<Resource> toResources(Iterable<? extends ITAGroup> groups){
        List<Resource> resources = new ArrayList<>();
        for(ITAGroup group : groups){
            resources.add(new Resource<ITAGroup>(group, linkTo(ITAGroupController.class)
                    .slash(group.getId()).withSelfRel()));
        }
        return resources;
    }
    @Override
    public Resource toResource(ITAGroup itaGroup) {
        return new Resource<ITAGroup>(itaGroup, linkTo(ITAGroupController.class)
                .slash(itaGroup.getId()).withSelfRel());
    }

}
