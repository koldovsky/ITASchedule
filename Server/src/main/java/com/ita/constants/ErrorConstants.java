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
    public static final Integer MIN_ITAGROUP_STUDENTS_COUNT = 1;
    public static final String STUDENTS_COUNT_OUT_OF_RANGE = String.format("Number of studens in a group should be in the range of %d and %d",
            MIN_ITAGROUP_STUDENTS_COUNT, MAX_ITAGROUP_STUDENTS_COUNT);
    public static final String STARTDATE_IS_BEFORE_CURRENTDATE = "Start date is before the current date";
    public static final String ENDDATE_IS_BEFORE_STARTDATE = "End date is before the start date";
}