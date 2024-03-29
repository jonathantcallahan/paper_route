#version 300 es
precision highp float;
precision highp int;

uniform mediump sampler2D maskTexture;
uniform mediump sampler2D flowTexture;
uniform flowLevel { float _flowLevel; };
uniform mediump sampler2D ganTexture;
uniform enable { float _enable; };
uniform mediump sampler2D _MainTex;
uniform mvpMat { mat4 _mvpMat; };
uniform isGan { float _isGan; };

in mediump vec2 uv;
in mediump vec2 uv_screen;
layout(location = 0) out mediump vec4 color;

void main()
{
    mediump vec4 _19 = texture(maskTexture, uv);
    mediump float _22 = _19.x;
    vec4 _40 = ((texture(flowTexture, uv) - vec4(0.5)) * 0.125) * clamp(_flowLevel, 0.0, 1.0);
    mediump vec4 _45 = texture(ganTexture, uv);
    color = mix(vec4(texture(_MainTex, uv_screen + (_mvpMat * vec4(_40.x, -_40.y, 0.0, 0.0)).xy).xyz, _22 * _enable), vec4(_45.xyz, (_45.w * _22) * _enable), vec4(_isGan));
}

