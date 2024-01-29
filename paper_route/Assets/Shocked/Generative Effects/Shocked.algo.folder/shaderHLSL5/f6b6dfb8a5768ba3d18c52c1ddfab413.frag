Texture2D<float4> maskTexture : register(t0);
SamplerState _maskTexture_sampler : register(s0);
Texture2D<float4> flowTexture : register(t1);
SamplerState _flowTexture_sampler : register(s1);
uniform float flowLevel;
Texture2D<float4> ganTexture : register(t2);
SamplerState _ganTexture_sampler : register(s2);
uniform float enable;
Texture2D<float4> _MainTex : register(t3);
SamplerState __MainTex_sampler : register(s3);
row_major uniform float4x4 mvpMat;
uniform float isGan;

static float2 uv;
static float2 uv_screen;
static float4 color;

struct SPIRV_Cross_Input
{
    float2 uv : uv;
    float2 uv_screen : uv_screen;
};

struct SPIRV_Cross_Output
{
    float4 color : SV_Target0;
};

void frag_main()
{
    float4 _19 = maskTexture.Sample(_maskTexture_sampler, uv);
    float _22 = _19.x;
    float4 _40 = ((flowTexture.Sample(_flowTexture_sampler, uv) - 0.5f.xxxx) * 0.125f) * clamp(flowLevel, 0.0f, 1.0f);
    float4 _45 = ganTexture.Sample(_ganTexture_sampler, uv);
    color = lerp(float4(_MainTex.Sample(__MainTex_sampler, uv_screen + mul(float4(_40.x, -_40.y, 0.0f, 0.0f), mvpMat).xy).xyz, _22 * enable), float4(_45.xyz, (_45.w * _22) * enable), isGan.xxxx);
}

SPIRV_Cross_Output main(SPIRV_Cross_Input stage_input)
{
    uv = stage_input.uv;
    uv_screen = stage_input.uv_screen;
    frag_main();
    SPIRV_Cross_Output stage_output;
    stage_output.color = color;
    return stage_output;
}
