row_major uniform float4x4 mvpMat;

static float4 gl_Position;
static float3 attPosition;
static float2 uv;
static float2 attTexcoord0;
static float2 uv_screen;

struct SPIRV_Cross_Input
{
    float3 attPosition : attPosition;
    float2 attTexcoord0 : attTexcoord0;
};

struct SPIRV_Cross_Output
{
    float2 uv : uv;
    float2 uv_screen : uv_screen;
    float4 gl_Position : SV_Position;
};

void vert_main()
{
    gl_Position = mul(float4(attPosition.xy, 0.0f, 1.0f), mvpMat);
    uv = attTexcoord0;
    uv = float2(attTexcoord0.x, 1.0f - attTexcoord0.y);
    uv_screen = ((gl_Position.xy / gl_Position.w.xx) * 0.5f) + 0.5f.xx;
    gl_Position.y = -gl_Position.y;
    gl_Position.z = (gl_Position.z + gl_Position.w) * 0.5;
}

SPIRV_Cross_Output main(SPIRV_Cross_Input stage_input)
{
    attPosition = stage_input.attPosition;
    attTexcoord0 = stage_input.attTexcoord0;
    vert_main();
    SPIRV_Cross_Output stage_output;
    stage_output.gl_Position = gl_Position;
    stage_output.uv = uv;
    stage_output.uv_screen = uv_screen;
    return stage_output;
}
