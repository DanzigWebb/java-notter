package com.example.notter.util;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Util {
    public static <T, R> List<T>
    getModel(List<R> list, Function<? super R, ? extends T> fn) {
        if (list == null) {
            return new ArrayList<>();
        }

        return list
                .stream().map(fn)
                .collect(Collectors.toList());
    }
}
