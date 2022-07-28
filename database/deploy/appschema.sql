-- Deploy cselectives:appschema to pg

BEGIN;
CREATE SCHEMA cselectives;

CREATE TABLE cselectives.users (
    zid                 text NOT NULL,
    bookmarked_reviews  text[] NOT NULL,
    bookmarked_courses  text[] NOT NULL,
    is_admin            boolean NOT NULL,
    CONSTRAINT pk_zid PRIMARY KEY ( zid )
);

CREATE TABLE cselectives.courses (
    course_code        text NOT NULL,
    archived           boolean NOT NULL,
    attributes         text[] NOT NULL,
    calendar           text NOT NULL,
    campus             text NOT NULL,
    description        text NOT NULL,
    enrolment_rules    text NOT NULL,
    equivalents        text[] NOT NULL,
    exclusions         text[] NOT NULL,
    faculty            text NOT NULL,
    field_of_education text NOT NULL,
    gen_ed             boolean NOT NULL,
    level              integer NOT NULL,
    school             text NOT NULL,
    study_level        text NOT NULL,
    terms              integer[] NOT NULL,
    title              text NOT NULL,
    uoc                integer NOT NULL,
    rating             float NOT NULL,
    CONSTRAINT pk_course_code PRIMARY KEY ( course_code )
);

CREATE TABLE cselectives.reviews (
    review_id          uuid NOT NULL DEFAULT gen_random_uuid(),
    zid                text NOT NULL,
    course_code        text NOT NULL,
    author_name        text NOT NULL,
    description        text NULL,
    grade              integer NULL,
    term_taken         text NOT NULL,
    created_timestamp  timestamp NOT NULL DEFAULT current_timestamp,
    updated_timestamp  timestamp NOT NULL DEFAULT current_timestamp,
    upvotes            text[] NOT NULL,
    manageability      float NOT NULL,
    usefulness         float NOT NULL,
    enjoyability       float NOT NULL,
    overall_rating     float NOT NULL,
    CONSTRAINT pk_review_id     PRIMARY KEY ( review_id ),
    CONSTRAINT fk_course_code   FOREIGN KEY ( course_code ) REFERENCES cselectives.courses(course_code),
    CONSTRAINT fk_zid           FOREIGN KEY ( zid )         REFERENCES cselectives.users(zid)
);

CREATE TYPE report_status AS ENUM ('REMOVED', 'UNSEEN', 'SEEN', 'SETTLED');
CREATE TABLE cselectives.reports (
    report_id                uuid NOT NULL DEFAULT gen_random_uuid(),
    review_id                uuid NOT NULL,
    zid                      text NOT NULL,
    status                   report_status NOT NULL,
    reason                   text NOT NULL,
    created_timestamp        timestamp NOT NULL DEFAULT current_timestamp,
    updated_timestamp        timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT pk_report_id  PRIMARY KEY ( report_id ),
    CONSTRAINT fk_review_id  FOREIGN KEY ( review_id ) REFERENCES cselectives.reviews( review_id ),
    CONSTRAINT fk_zid        FOREIGN KEY ( zid )       REFERENCES cselectives.users(zid)
);

INSERT INTO cselectives.courses
VALUES
    (
        'COMP1511', 
        FALSE, 
        '{"yeet"}', 
        '3+', 
        'Kensington', 
        'An introduction to problem-solving via programming, which aims to have students develop proficiency in using a high level programming language. '
        'Topics: algorithms, program structures (statements, sequence, selection, iteration, functions), data types (numeric, character), data structures '
        '(arrays, tuples, pointers, lists), storage structures (memory, addresses), introduction to analysis of algorithms, testing, code quality, teamwork, '
        'and reflective practice. The course includes extensive practical work in labs and programming projects. Additional Information This course should  '
        'be taken by all CSE majors, and any other students who have an interest in computing or who wish to be extended. It does not require any prior '
        'computing knowledge or experience. COMP1511 leads on to COMP1521, COMP1531, COMP2511 and COMP2521, which form the core of the study of computing at '
        'UNSW and which are pre-requisites for the full range of further computing courses. Due to overlapping material, students who complete COMP1511 may '
        'not also enrol in COMP1911 or COMP1921.', 
        '', 
        '{"COMP1917","DPST1091"}', 
        '{"DPST1091"}', 
        'Faculty of Engineering', 
        '020103 Programming', 
        TRUE, 
        1, 
        'School of Computer Science and Engineering', 
        'Undergraduate', 
        '{1, 2, 3}', 
        'Programming Fundamentals', 
        6,
        4
    ),
    (
        'COMP1531', 
        FALSE, 
        '{"yeet"}', 
        '3+', 
        'Kensington', 
        'This course provides an introduction to software engineering principles: basic software lifecycle concepts, modern development methodologies, '
        'conceptual modeling and how these activities relate to programming. It also introduces the basic notions of team-based project management via '
        'conducting a project to design, build and deploy a simple web-based application. It is typically taken in the term after completing COMP1511, but '
        'could be delayed and taken later. It provides essential background for the teamwork and project management required in many later courses.The goal '
        'of this course is to expose the students to:basic elements of software engineering: including requirements elicitation, analysis and specification; '
        'design; construction; verification and validation; deployment; and operation and maintenancedata modellingsoftware engineering methodologies, '
        'processes, measurements, tools and techniquesWeb-based system architecture and development practices on Web platforms.', 
        'Prerequisite: COMP1511 or DPST1091 or COMP1917 or COMP1921', 
        '{}', 
        '{"SENG1010","SENG1020","SENG1031"}', 
        'Faculty of Engineering', 
        '020103 Programming', 
        TRUE, 
        1, 
        'School of Computer Science and Engineering', 
        'Undergraduate', 
        '{1, 2, 3}', 
        'Programming Fundamentals', 
        6,
        4
    );

INSERT INTO cselectives.users
VALUES
    (
        'z5555555',
        '{}',
        '{"COMP1511"}',
        TRUE
    ),
    (
        'z5000000',
        '{}',
        '{"COMP1531"}',
        FALSE
    );

INSERT INTO cselectives.reviews
VALUES(
    gen_random_uuid(), 
    'z5555555', 
    'COMP1511', 
    'Admin user', 
    'Amazing course', 
    99, 
    '20T1', 
    current_timestamp,
    current_timestamp,
    '{}',
    3,
    4,
    5,
    4.5);

COMMIT;
