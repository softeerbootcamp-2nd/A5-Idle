package com.autoever.idle.domain.detailModel.engine;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class EngineRepositoryImpl implements EngineRepository {

    private final JdbcTemplate jdbcTemplate;

    public EngineRepositoryImpl(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<EngineResDto> findAll(Long trimId) {
        return jdbcTemplate.query("select e.* from ENGINE e left join TRIM_ENGINE te " +
                        "on e.engine_id = te.engine_id where te.trim_id = ?",
                (rs, rowNum) -> new EngineResDto(
                        rs.getLong("engine_id"),
                        rs.getString("type"),
                        rs.getInt("price"),
                        rs.getString("description"),
                        rs.getString("purchase_rate"),
                        rs.getString("img_url"),
                        rs.getInt("peak_output"),
                        rs.getDouble("max_torque"),
                        rs.getDouble("min_fuel"),
                        rs.getDouble("max_fuel")
                ),
                trimId
        );
    }
}
