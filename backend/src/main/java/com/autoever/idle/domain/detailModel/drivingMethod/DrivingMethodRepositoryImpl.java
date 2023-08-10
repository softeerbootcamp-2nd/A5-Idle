package com.autoever.idle.domain.detailModel.drivingMethod;

import com.autoever.idle.domain.detailModel.engine.EngineResDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class DrivingMethodRepositoryImpl implements DrivingMethodRepository {

    private final JdbcTemplate jdbcTemplate;

    public DrivingMethodRepositoryImpl(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<DrivingMethodResDto> findAll(Long trimId) {
        return jdbcTemplate.query("select d.* from DRIVING_METHOD d left join TRIM_DRIVING_METHOD tdm " +
                "on d.driving_method_id = tdm.driving_method_id where tdm.trim_id = ?",
                (rs, rowNum) -> new DrivingMethodResDto(
                        rs.getLong("driving_method_id"),
                        rs.getString("type"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getString("img_url"),
                        rs.getString("purchase_rate")
                ),
                trimId
        );
    }
}
