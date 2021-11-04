package com.example.notter.util;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

public class Util {
    public static <T> List<T> IterableToList(Iterable<T> iterable) {
        if (iterable == null) {
            return new ArrayList<>();
        }
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }
}
