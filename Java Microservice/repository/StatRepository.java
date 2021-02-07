package com.saraf.hdstats.repository;

import com.saraf.hdstats.beans.Stat;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface StatRepository extends CrudRepository<Stat, Long> {

    Stat findByButton(String button);
    Boolean existsByTitle(String title);

    @Transactional
    @Modifying
    @Query(value = "UPDATE STATS" +
                   " SET COUNTER = COUNTER + ?1" +
                   " WHERE TITLE = ?2", nativeQuery = true)
    void updateCounter(long counter, String title);

    @Query(value = "SELECT SUM(COUNTER) FROM STATS", nativeQuery = true)
    long getUniversalCounter();

}
