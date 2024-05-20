#include "color.h"
#include "ray.h"
#include "vec3.h"

#include <iostream>

bool hit_sphere(const point3& center, double radius, const ray& r) {
    vec3 oc = center - r.origin();
    auto a = dot(r.direction(), r.direction());
    auto b = -2.0 * dot(r.direction(), oc);
    auto c = dot(oc, oc) - radius*radius;
    auto discriminant = b*b - 4*a*c;
    return (discriminant >= 0);
}

color ray_color(const ray& r) {
    if (hit_sphere(point3(0,0,-1), 0.5, r))
        return color(1, 0, 0);

    vec3 unit_direction = unit_vector(r.direction());
    auto a = 0.5*(unit_direction.y() + 1.0);
    return (1.0-a)*color(1.0, 1.0, 1.0) + a*color(0.5, 0.7, 1.0);
}

// (𝐶𝑥−𝑥)2+(𝐶𝑦−𝑦)2+(𝐶𝑧−𝑧)2=𝑟2
// true: 点 (x,y,z) 在球面上
// > 𝑟2: 点 (x,y,z) 在球体外
// < 𝑟2: 点 (x,y,z) 在球体内

int main() {

    // Image

    auto aspect_ratio = 16.0 / 9.0;
    int image_width = 400;

    // Calculate the image height, and ensure that it's at least 1.
    int image_height = int(image_width / aspect_ratio);
    image_height = (image_height < 1) ? 1 : image_height;

    // Camera
    auto focal_length = 1.0;
    // 视窗高度
    auto viewport_height = 2.0;
    // 视窗宽度
    auto viewport_width = viewport_height * (double(image_width)/image_height);
    // 相机中心位置
    auto camera_center = point3(0, 0, 0);

    // 是一个在x轴方向上长度为视窗宽度、y和z方向为0的向量,代表视窗的水平边。
    auto viewport_u = vec3(viewport_width, 0, 0);
    // 是一个在y轴方向上长度为负的视窗高度、x和z方向为0的向量,代表视窗的垂直边。负值是因为图像的y轴正方向是向下的。
    auto viewport_v = vec3(0, -viewport_height, 0);

    // 这两个变量表示在视窗上从一个像素移动到下一个像素需要移动的水平和垂直增量向量。
    // 可以理解为视窗上一个像素的宽度和高度对应的向量。
    auto pixel_delta_u = viewport_u / image_width;
    auto pixel_delta_v = viewport_v / image_height;


    // 这个变量表示视窗左上角像素的中心位置。
    // 它是通过将相机中心沿着相机的前方向移动焦距的距离, 再沿着viewport_u和viewport_v分别移动它们长度的一半得到的
    // 可以理解为视窗平面上最左上角的那个像素的中心位置。
    auto viewport_upper_left = camera_center - vec3(0, 0, focal_length) - viewport_u/2 - viewport_v/2;
    /**
    * 这个变量 = 从原点开始, 第一个像素的中心位置
    */
    auto pixel00_loc = viewport_upper_left + 0.5 * (pixel_delta_u + pixel_delta_v);

    // Render

    std::cout << "P3\n" << image_width << " " << image_height << "\n255\n";

    for (int y = 0; y < image_height; y++) {
        std::clog << "\rScanlines remaining: " << (image_height - y) << ' ' << std::flush;
        for (int x = 0; x < image_width; x++) {
            auto pixel_center = pixel00_loc + (x * pixel_delta_u) + (y * pixel_delta_v);
            auto ray_direction = pixel_center - camera_center;
            ray r(camera_center, ray_direction);

            color pixel_color = ray_color(r);
            write_color(std::cout, pixel_color);
        }
    }

    std::clog << "\rDone.                 \n";
}
