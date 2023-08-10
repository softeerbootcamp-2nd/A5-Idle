SET foreign_key_checks = 0;
DROP TABLE IF EXISTS CAR_MASTER;
DROP TABLE IF EXISTS CAR_TYPE;
DROP TABLE IF EXISTS TRIM;
DROP TABLE IF EXISTS ENGINE;
DROP TABLE IF EXISTS TRIM_ENGINE;
DROP TABLE IF EXISTS DRIVING_METHOD;
DROP TABLE IF EXISTS TRIM_DRIVING_METHOD;
DROP TABLE IF EXISTS BODY_TYPE;
DROP TABLE IF EXISTS TRIM_BODY_TYPE;
DROP TABLE IF EXISTS EXTERIOR_COLOR;
DROP TABLE IF EXISTS CAR_EXTERIOR_IMAGE;
DROP TABLE IF EXISTS TRIM_EXTERIOR_COLOR;
DROP TABLE IF EXISTS INTERIOR_COLOR;
DROP TABLE IF EXISTS OPTION_CATEGORY;
DROP TABLE IF EXISTS `OPTION`;
DROP TABLE IF EXISTS FUNCTION_CATEGORY;
DROP TABLE IF EXISTS FUNCTIONS;
DROP TABLE IF EXISTS TRIM_FUNCTION;
DROP TABLE IF EXISTS OPTION_STATUS;
SET foreign_key_checks = 1;
create table if not exists  CAR_MASTER
(
    car_master_id bigint auto_increment
    primary key,
    name          varchar(10) null,
    phone_number  varchar(11) null,
    dealership    varchar(20) null,
    description   text        null,
    sales_rate    int         null,
    img_url       text        null,
    latitude      double      null,
    longitude     double      null
    );

create table if not exists  CAR_TYPE
(
    car_type_id bigint auto_increment
    primary key,
    name        varchar(10) null
    );

create table if not exists  TRIM
(
    trim_id       bigint auto_increment
    primary key,
    name          varchar(20) null,
    price         int         null,
    img_url       text        null,
    description   text        null,
    purchase_rate varchar(20) null,
    car_type_id   bigint      null,
    constraint FK_CAR_TYPE_TO_TRIM_1
    foreign key (car_type_id) references CAR_TYPE (car_type_id)
    );

create table if not exists  ENGINE
(
    engine_id     bigint auto_increment
    primary key,
    type          varchar(30) null,
    img_url       text        null,
    price         int         null,
    peak_output   int         null,
    max_torque    double      null,
    min_fuel      double      null,
    max_fuel      double      null,
    purchase_rate varchar(20) null,
    description   text        null
    );

create table if not exists  TRIM_ENGINE
(
    trim_engine_id bigint auto_increment
    primary key,
    trim_id        bigint null,
    engine_id      bigint null,
    constraint FK_ENGINE_TO_TRIM_ENGINE_1
    foreign key (engine_id) references ENGINE (engine_id),
    constraint FK_TRIM_TO_TRIM_ENGINE_1
    foreign key (trim_id) references TRIM (trim_id)
    );

create table if not exists  DRIVING_METHOD
(
    driving_method_id bigint auto_increment
    primary key,
    type              varchar(10) null,
    price             int         null,
    description       text        null,
    img_url           text        null,
    purchase_rate     varchar(20) null
    );

create table if not exists  TRIM_DRIVING_METHOD
(
    trim_driving_method_id bigint auto_increment
    primary key,
    trim_id                bigint null,
    driving_method_id      bigint null,
    constraint FK_DRIVING_METHOD_TO_TRIM_DRIVING_METHOD_1
    foreign key (driving_method_id) references DRIVING_METHOD (driving_method_id),
    constraint FK_TRIM_TO_TRIM_DRIVING_METHOD_1
    foreign key (trim_id) references TRIM (trim_id)
    );

create table if not exists  BODY_TYPE
(
    body_type_id  bigint auto_increment
    primary key,
    type          varchar(10) null,
    price         int         null,
    description   text        null,
    purchase_rate varchar(20) null,
    img_url       text        null
    );

create table if not exists  TRIM_BODY_TYPE
(
    trim_body_type_id bigint auto_increment
    primary key,
    trim_id           bigint null,
    body_type_id      bigint null,
    constraint FK_BODY_TYPE_TO_TRIM_BODY_TYPE_1
    foreign key (body_type_id) references BODY_TYPE (body_type_id),
    constraint FK_TRIM_TO_TRIM_BODY_TYPE_1
    foreign key (trim_id) references TRIM (trim_id)
    );

create table if not exists  EXTERIOR_COLOR
(
    exterior_color_id bigint auto_increment
    primary key,
    color             varchar(20) null,
    color_img_url     text        null,
    price             int         null,
    purchase_rate     varchar(20) null
    );

create table if not exists  CAR_EXTERIOR_IMAGE
(
    car_exterior_img_id  bigint auto_increment
    primary key,
    car_exterior_img_url text   null,
    exterior_color_id    bigint null,
    img_sequence         int    null,
    constraint FK_EXTERIOR_COLOR_TO_CAR_EXTERIOR_IMAGE_1
    foreign key (exterior_color_id) references EXTERIOR_COLOR (exterior_color_id)
    );

create table if not exists  TRIM_EXTERIOR_COLOR
(
    trim_exterior_color_id bigint auto_increment
    primary key,
    trim_id                bigint null,
    exterior_color_id      bigint null,
    constraint FK_EXTERIOR_COLOR_TO_TRIM_EXTERIOR_COLOR_1
    foreign key (exterior_color_id) references EXTERIOR_COLOR (exterior_color_id),
    constraint FK_TRIM_TO_TRIM_EXTERIOR_COLOR_1
    foreign key (trim_id) references TRIM (trim_id)
    );

create table if not exists  INTERIOR_COLOR
(
    interior_color_id      bigint auto_increment
    primary key,
    color                  varchar(20) null,
    price                  int         null,
    interior_img_url       text        null,
    color_img_url          text        null,
    purchase_rate          varchar(20) null,
    trim_exterior_color_id bigint      null,
    constraint FK_TRIM_EXTERIOR_COLOR_TO_INTERIOR_COLOR_1
    foreign key (trim_exterior_color_id) references TRIM_EXTERIOR_COLOR (trim_exterior_color_id)
    );

create table if not exists  OPTION_CATEGORY
(
    option_category_id bigint auto_increment
    primary key,
    name               varchar(20) null
    );

create table if not exists  `OPTION`
(
    option_id          bigint auto_increment
    primary key,
    name               varchar(30) null,
    price              int         null,
    description        text        null,
    purchase_rate      varchar(20) null,
    option_category_id bigint      null,
    constraint FK_OPTION_CATEGORY_TO_OPTION_1
    foreign key (option_category_id) references OPTION_CATEGORY (option_category_id)
    );

create table if not exists  FUNCTION_CATEGORY
(
    function_category_id bigint auto_increment
    primary key,
    name                 varchar(20) null
    );

create table if not exists  FUNCTIONS
(
    function_id          bigint auto_increment
    primary key,
    name                 varchar(100) null,
    description          text         null,
    img_url              text         null,
    option_id            bigint       null,
    is_my_trim           varchar(5)   null,
    function_category_id bigint       null,
    wheel_logo_img_url   text         null,
    constraint FK_FUNCTION_CATEGORY_TO_FUNCTION_1
    foreign key (function_category_id) references FUNCTION_CATEGORY (function_category_id),
    constraint FK_OPTION_TO_FUNCTION_1
    foreign key (option_id) references `OPTION` (option_id)
    );

create table if not exists  TRIM_FUNCTION
(
    trim_function_id bigint auto_increment
    primary key,
    is_default       varchar(5) null,
    function_id      bigint     null,
    trim_id          bigint     null,
    constraint FK_FUNCTION_TO_TRIM_FUNCTION_1
    foreign key (function_id) references FUNCTIONS (function_id),
    constraint FK_TRIM_TO_TRIM_FUNCTION_1
    foreign key (trim_id) references TRIM (trim_id)
    );

create table if not exists  OPTION_STATUS
(
    option_status_id        bigint auto_increment
    primary key,
    selected_option_id      bigint null,
    not_activated_option_id bigint null,
    selected_engine_id      bigint null,
    constraint FK_ENGINE_TO_OPTION_STATUS_1
    foreign key (selected_engine_id) references ENGINE (engine_id),
    constraint FK_OPTION_TO_OPTION_STATUS_1
    foreign key (selected_option_id) references `OPTION` (option_id),
    constraint FK_OPTION_TO_OPTION_STATUS_2
    foreign key (not_activated_option_id) references `OPTION` (option_id)
);

