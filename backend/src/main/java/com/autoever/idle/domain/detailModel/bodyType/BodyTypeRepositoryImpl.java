package com.autoever.idle.domain.detailModel.bodyType;

import com.autoever.idle.domain.detailModel.drivingMethod.DrivingMethodResDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BodyTypeRepositoryImpl implements BodyTypeRepository{

    private final JdbcTemplate jdbcTemplate;

    public BodyTypeRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<BodyTypeResDto> findAll(Long trimId) {
        return jdbcTemplate.query("select b.* from BODY_TYPE b left join TRIM_BODY_TYPE tbt " +
                "on b.body_type_id = tbt.body_type_id where tbt.trim_id = ?",
                (rs, rowNum) -> new BodyTypeResDto(
                        rs.getLong("body_type_id"),
                        rs.getString("type"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getString("purchase_rate"),
                        rs.getString("img_url")
                ),
                trimId
        );
    }
}
