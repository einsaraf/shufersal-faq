package com.saraf.hdstats.beans;

import javax.persistence.*;
import java.util.concurrent.atomic.AtomicLong;

@Entity(name = "STAT")
@Table(name = "STATS")
public class Stat { // The Stat object devided into 3 properties, button(id of the item on the web),
    // title which is the name of the button and the counter which counts the number of hits in total

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String button;
    private String title;
    private long counter;

    protected Stat() {}

    public Stat(String button, String title, long counter) {
        this.button = button;
        this.title = title;
        this.counter = counter;
    }

    public String toString() {
        return String.format("A stat with ID of %d, button of '%s', title of '%s' and counter of %d", id, button, title, counter);
    }

    @Column(nullable = false)
    public long getId() {
        return id;
    }
    @Column(nullable = false)
    public String getButton() {
        return button;
    }
    @Column(nullable = false)
    public String getTitle() {
        return title;
    }
    @Column(nullable = false)
    public long getCounter() {
        return counter;
    }
}
