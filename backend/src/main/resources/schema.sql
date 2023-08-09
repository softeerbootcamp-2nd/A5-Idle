CREATE TABLE `CAR_MASTER` (
                              `car_master_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                              `name`	varchar(10)	NULL,
                              `phone_number`	varchar(11)	NULL,
                              `dealership`	varchar(20)	NULL,
                              `description`	text	NULL,
                              `sales_rate`	int	NULL,
                              `img_url`	text	NULL,
                              `latitude`	double	NULL,
                              `longitude`	double	NULL
);

CREATE TABLE `CAR_TYPE` (
                            `car_type_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                            `name`	varchar(10)	NULL
);

CREATE TABLE `TRIM` (
                        `trim_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                        `name`	varchar(20)	NULL,
                        `price`	int	NULL,
                        `img_url`	text	NULL,
                        `description`	text	NULL,
                        `purchase_rate`	varchar(20)	NULL,
                        `car_type_id`	bigint NULL
);

CREATE TABLE `ENGINE` (
                          `engine_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                          `name`	varchar(30)	NULL,
                          `img_url`	text	NULL,
                          `price`	int	NULL,
                          `peak_output`	int	NULL,
                          `max_torque`	double	NULL,
                          `min_fuel`	double	NULL,
                          `max_fuel`	double	NULL,
                          `purchase_rate`	varchar(20)	NULL,
                          `description`	text	NULL
);

CREATE TABLE `TRIM_ENGINE` (
                               `trim_engine_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                               `trim_id`	bigint	NULL,
                               `engine_id`	bigint	NULL
);

CREATE TABLE `DRIVING_METHOD` (
                                  `driving_method_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                  `name`	varchar(10)	NULL,
                                  `price`	int	NULL,
                                  `description`	text	NULL,
                                  `img_url`	text	NULL,
                                  `purchase_rate`	varchar(20)	NULL
);

CREATE TABLE `TRIM_DRIVING_METHOD` (
                                       `trim_driving_mehtod_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                       `trim_id`	bigint	NULL,
                                       `driving_method_id`	bigint NULL
);

CREATE TABLE `BODY_TYPE` (
                             `body_type_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                             `name`	varchar(10)	NULL,
                             `price`	int	NULL,
                             `description`	text	NULL,
                             `purchase_rate`	varchar(20)	NULL,
                             `img_url`	text	NULL
);

CREATE TABLE `TRIM_BODY_TYPE` (
                                  `trim_body_type_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                  `trim_id`	bigint	NULL,
                                  `body_type_id`	bigint	NULL
);

CREATE TABLE `EXTERIOR_COLOR` (
                                  `exterior_color_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                  `color`	varchar(20)	NULL,
                                  `color_img_url`	text	NULL,
                                  `price`	int	NULL,
                                  `purchase_rate`	varchar(20)	NULL
);

CREATE TABLE `CAR_EXTERIOR_IMAGE` (
                                      `car_exterior_img_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                      `car_exterior_img_url`	text	NULL,
                                      `exterior_color_id`	bigint	NULL,
                                      `img_sequence`	int	NULL
);

CREATE TABLE `INTERIOR_COLOR` (
                                  `interior_color_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                  `color`	varchar(20)	NULL,
                                  `price`	int	NULL,
                                  `interior_img_url`	text	NULL,
                                  `color_img_url`	text	NULL,
                                  `purchase_rate`	varchar(20)	NULL,
                                  `trim_exterior_color_id`	bigint	NULL
);

CREATE TABLE `OPTION` (
                          `option_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                          `name`	varchar(30)	NULL,
                          `price`	int	NULL,
                          `description`	text	NULL,
                          `purchase_rate`	varchar(20)	NULL,
                          `option_category_id`	bigint	NULL
);

CREATE TABLE `FUNCTIONS` (
                            `functions_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                            `name`	varchar(100)	NULL,
                            `description`	text	NULL,
                            `img_url`	text	NULL,
                            `option_id`	bigint	NULL,
                            `is_my_trim`	varchar(5)	NULL,
                            `function_category_id`	bigint	NULL,
                            `wheel_logo_img_url`	text	NULL
);

CREATE TABLE `TRIM_FUNCTION` (
                                 `trim_function_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                 `is_default`	varchar(5)	NULL,
                                 `functions_id`	bigint	NULL,
                                 `trim_id`	bigint	NULL
);

CREATE TABLE `OPTION_CATEGORY` (
                                   `option_category_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                   `name`	varchar(20)	NULL
);

CREATE TABLE `TRIM_EXTERIOR_COLOR` (
                                       `trim_exterior_color_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                       `trim_id`	bigint	NULL,
                                       `exterior_color_id`	bigint	NULL
);

CREATE TABLE `OPTION_STATUS` (
                                 `option_status_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                 `selected_option_id`	bigint	NULL,
                                 `not_activated_option_id`	bigint	NULL,
                                 `selected_engine_id`	bigint	NULL
);

CREATE TABLE `FUNCTION_CATEGORY` (
                                     `function_category_id`	bigint AUTO_INCREMENT PRIMARY KEY 	NOT NULL,
                                     `name`	varchar(20)	NULL
);


ALTER TABLE `TRIM` ADD CONSTRAINT `FK_CAR_TYPE_TO_TRIM_1` FOREIGN KEY (
                                                                       `car_type_id`
    )
    REFERENCES `CAR_TYPE` (
                           `car_type_id`
        );

ALTER TABLE `TRIM_ENGINE` ADD CONSTRAINT `FK_TRIM_TO_TRIM_ENGINE_1` FOREIGN KEY (
                                                                                 `trim_id`
    )
    REFERENCES `TRIM` (
                       `trim_id`
        );

ALTER TABLE `TRIM_ENGINE` ADD CONSTRAINT `FK_ENGINE_TO_TRIM_ENGINE_1` FOREIGN KEY (
                                                                                   `engine_id`
    )
    REFERENCES `ENGINE` (
                         `engine_id`
        );

ALTER TABLE `TRIM_DRIVING_METHOD` ADD CONSTRAINT `FK_TRIM_TO_TRIM_DRIVING_METHOD_1` FOREIGN KEY (
                                                                                                 `trim_id`
    )
    REFERENCES `TRIM` (
                       `trim_id`
        );

ALTER TABLE `TRIM_DRIVING_METHOD` ADD CONSTRAINT `FK_DRIVING_METHOD_TO_TRIM_DRIVING_METHOD_1` FOREIGN KEY (
                                                                                                           `driving_method_id`
    )
    REFERENCES `DRIVING_METHOD` (
                                 `driving_method_id`
        );

ALTER TABLE `TRIM_BODY_TYPE` ADD CONSTRAINT `FK_TRIM_TO_TRIM_BODY_TYPE_1` FOREIGN KEY (
                                                                                       `trim_id`
    )
    REFERENCES `TRIM` (
                       `trim_id`
        );

ALTER TABLE `TRIM_BODY_TYPE` ADD CONSTRAINT `FK_BODY_TYPE_TO_TRIM_BODY_TYPE_1` FOREIGN KEY (
                                                                                            `body_type_id`
    )
    REFERENCES `BODY_TYPE` (
                            `body_type_id`
        );

ALTER TABLE `CAR_EXTERIOR_IMAGE` ADD CONSTRAINT `FK_EXTERIOR_COLOR_TO_CAR_EXTERIOR_IMAGE_1` FOREIGN KEY (
                                                                                                         `exterior_color_id`
    )
    REFERENCES `EXTERIOR_COLOR` (
                                 `exterior_color_id`
        );

ALTER TABLE `INTERIOR_COLOR` ADD CONSTRAINT `FK_TRIM_EXTERIOR_COLOR_TO_INTERIOR_COLOR_1` FOREIGN KEY (
                                                                                                      `trim_exterior_color_id`
    )
    REFERENCES `TRIM_EXTERIOR_COLOR` (
                                      `trim_exterior_color_id`
        );

ALTER TABLE `OPTION` ADD CONSTRAINT `FK_OPTION_CATEGORY_TO_OPTION_1` FOREIGN KEY (
                                                                                  `option_category_id`
    )
    REFERENCES `OPTION_CATEGORY` (
                                  `option_category_id`
        );

ALTER TABLE `FUNCTIONS` ADD CONSTRAINT `FK_OPTION_TO_FUNCTION_1` FOREIGN KEY (
                                                                             `option_id`
    )
    REFERENCES `OPTION` (
                         `option_id`
        );

ALTER TABLE `FUNCTIONS` ADD CONSTRAINT `FK_FUNCTION_CATEGORY_TO_FUNCTION_1` FOREIGN KEY (
                                                                                        `function_category_id`
    )
    REFERENCES `FUNCTION_CATEGORY` (
                                    `function_category_id`
        );

ALTER TABLE `TRIM_FUNCTION` ADD CONSTRAINT `FK_FUNCTION_TO_TRIM_FUNCTION_1` FOREIGN KEY (
                                                                                         `functions_id`
    )
    REFERENCES `FUNCTIONS` (
                           `functions_id`
        );

ALTER TABLE `TRIM_FUNCTION` ADD CONSTRAINT `FK_TRIM_TO_TRIM_FUNCTION_1` FOREIGN KEY (
                                                                                     `trim_id`
    )
    REFERENCES `TRIM` (
                       `trim_id`
        );

ALTER TABLE `TRIM_EXTERIOR_COLOR` ADD CONSTRAINT `FK_TRIM_TO_TRIM_EXTERIOR_COLOR_1` FOREIGN KEY (
                                                                                                 `trim_id`
    )
    REFERENCES `TRIM` (
                       `trim_id`
        );

ALTER TABLE `TRIM_EXTERIOR_COLOR` ADD CONSTRAINT `FK_EXTERIOR_COLOR_TO_TRIM_EXTERIOR_COLOR_1` FOREIGN KEY (
                                                                                                           `exterior_color_id`
    )
    REFERENCES `EXTERIOR_COLOR` (
                                 `exterior_color_id`
        );

ALTER TABLE `OPTION_STATUS` ADD CONSTRAINT `FK_OPTION_TO_OPTION_STATUS_1` FOREIGN KEY (
                                                                                       `selected_option_id`
    )
    REFERENCES `OPTION` (
                         `option_id`
        );

ALTER TABLE `OPTION_STATUS` ADD CONSTRAINT `FK_OPTION_TO_OPTION_STATUS_2` FOREIGN KEY (
                                                                                       `not_activated_option_id`
    )
    REFERENCES `OPTION` (
                         `option_id`
        );

ALTER TABLE `OPTION_STATUS` ADD CONSTRAINT `FK_ENGINE_TO_OPTION_STATUS_1` FOREIGN KEY (
                                                                                       `selected_engine_id`
    )
    REFERENCES `ENGINE` (
                         `engine_id`
        );