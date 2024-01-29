#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float flowLevel;
    float enable;
    float4x4 mvpMat;
    float isGan;
};

struct main0_out
{
    float4 color [[color(0)]];
};

struct main0_in
{
    float2 uv [[user(locn0)]];
    float2 uv_screen [[user(locn1)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> maskTexture [[texture(0)]], texture2d<float> flowTexture [[texture(1)]], texture2d<float> ganTexture [[texture(2)]], texture2d<float> _MainTex [[texture(3)]], sampler maskTextureSmplr [[sampler(0)]], sampler flowTextureSmplr [[sampler(1)]], sampler ganTextureSmplr [[sampler(2)]], sampler _MainTexSmplr [[sampler(3)]])
{
    main0_out out = {};
    float4 _19 = maskTexture.sample(maskTextureSmplr, in.uv);
    float _22 = _19.x;
    float4 _40 = ((flowTexture.sample(flowTextureSmplr, in.uv) - float4(0.5)) * 0.125) * fast::clamp(buffer.flowLevel, 0.0, 1.0);
    float4 _45 = ganTexture.sample(ganTextureSmplr, in.uv);
    out.color = mix(float4(_MainTex.sample(_MainTexSmplr, (in.uv_screen + (buffer.mvpMat * float4(_40.x, -_40.y, 0.0, 0.0)).xy)).xyz, _22 * buffer.enable), float4(_45.xyz, (_45.w * _22) * buffer.enable), float4(buffer.isGan));
    return out;
}

