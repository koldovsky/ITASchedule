package com.ita.constants;

/**
 * Created by marian on 06.10.16.
 */
public final class ErrorConstants {

    public static final String BAD_ITAGROUP_OBJECT = "Some field of the received ITAGroup object may have not been initialized properly";
    public static final String ITAGROUP_NOT_VALID = "Failed to validate ITAGroup object.";
    public static final String OBJECT_ID_EXISTS = "Object with #id=%L already exists.";
    public static final String OBJECT_ID_NOT_FOUND = "No object found with #id=%L.";
    public static final Integer MAX_ITAGROUP_STUDENTS_COUNT = 100;
    public static final Integer MIN_ITAGROUP_STUDENTS_COUNT = 80;
    public static final String STUDENTS_COUNT_OUT_OF_RANGE = String.format("Number of studens in a group should be in the range of %d and %d",
            MIN_ITAGROUP_STUDENTS_COUNT, MAX_ITAGROUP_STUDENTS_COUNT);
    public static final String STARTDATE_IS_BEFORE_CURRENTDATE = "Start date is before the current date";
    public static final String ENDDATE_IS_BEFORE_STARTDATE = "End date is before the start date";
    public static final String NO_CREATOR_SPECIFIED = "Can't find the specified creator";
    public static final String NO_USERS_SPECIFIED = "List of the teachers is not valid";
    public static final String BLANK_TITLE = "Group must have a title";
    public static final String FULLNAME_CANT_BE_EMPTY = "Name can't be empty";
    public static final String EMAIL_IS_NOT_VALID = "Email is not valid";
    public static final String MISSING_USER = "Missing user in data base";
    public static final String MISIING_ITAGROUP = "Missing ITA Group in data base";
    public static final String MISIING_TYPE= "Missing event type ";
    public static final String MISSING_ROOM= "Missing room";

}
