#ifndef COLOR_H
#define COLOR_H

#include <iostream>
#include "vec3.h"

using color = vec3;

void write_color(std::ostream &out, const color &pixel_color) {
    auto r = pixel_color.x();
    auto g = pixel_color.y();
    auto b = pixel_color.z();

    // 映射 0-1 至 byte [0,255]
    int rbyte = int(255.999 * r);
    int gbyte = int(255.999 * g);
    int bbyte = int(255.999 * b);

    // Write out the pixel color components.
    // 把颜色写入缓冲区
    out << rbyte << ' ' << gbyte << ' ' << bbyte << '\n';
}

#endif
