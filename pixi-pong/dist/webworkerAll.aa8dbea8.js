function t(t,e,o,r){Object.defineProperty(t,e,{get:o,set:r,enumerable:!0,configurable:!0})}var e=globalThis.parcelRequire94c2,o=e.register;o("danRq",function(t,o){e("xtmW0"),e("4RJM2"),e("7dx1H"),e("bqs0D"),e("7rvGX"),e("hOtIT"),e("72HgH"),e("gltHT"),e("7t4bH"),e("jbAJT"),e("3WtzG"),e("3v0XG")}),o("2Aebl",function(e,o){t(e.exports,"State",()=>n);let r={normal:0,add:1,multiply:2,screen:3,overlay:4,erase:5,"normal-npm":6,"add-npm":7,"screen-npm":8,min:9,max:10},i=class t{constructor(){this.data=0,this.blendMode="normal",this.polygonOffset=0,this.blend=!0,this.depthMask=!0}get blend(){return!!(1&this.data)}set blend(t){!!(1&this.data)!==t&&(this.data^=1)}get offsets(){return!!(2&this.data)}set offsets(t){!!(2&this.data)!==t&&(this.data^=2)}set cullMode(t){if("none"===t){this.culling=!1;return}this.culling=!0,this.clockwiseFrontFace="front"===t}get cullMode(){return this.culling?this.clockwiseFrontFace?"front":"back":"none"}get culling(){return!!(4&this.data)}set culling(t){!!(4&this.data)!==t&&(this.data^=4)}get depthTest(){return!!(8&this.data)}set depthTest(t){!!(8&this.data)!==t&&(this.data^=8)}get depthMask(){return!!(32&this.data)}set depthMask(t){!!(32&this.data)!==t&&(this.data^=32)}get clockwiseFrontFace(){return!!(16&this.data)}set clockwiseFrontFace(t){!!(16&this.data)!==t&&(this.data^=16)}get blendMode(){return this._blendMode}set blendMode(t){this.blend="none"!==t,this._blendMode=t,this._blendModeId=r[t]||0}get polygonOffset(){return this._polygonOffset}set polygonOffset(t){this.offsets=!!t,this._polygonOffset=t}toString(){return`[pixi.js/core:State blendMode=${this.blendMode} clockwiseFrontFace=${this.clockwiseFrontFace} culling=${this.culling} depthMask=${this.depthMask} polygonOffset=${this.polygonOffset}]`}static for2d(){let e=new t;return e.depthTest=!1,e.blend=!0,e}};i.default2d=i.for2d();let n=i}),o("6B0gZ",function(e,o){t(e.exports,"color32BitToUniform",()=>r);function r(t,e,o){let r=(t>>24&255)/255;e[o++]=(255&t)/255*r,e[o++]=(t>>8&255)/255*r,e[o++]=(t>>16&255)/255*r,e[o++]=r}}),o("6qNFd",function(e,o){t(e.exports,"BatchableSprite",()=>r);class r{constructor(){this.batcherName="default",this.attributeSize=4,this.indexSize=6,this.packAsQuad=!0,this.roundPixels=0,this._attributeStart=0,this._batcher=null,this._batch=null}get blendMode(){return this.renderable.groupBlendMode}get color(){return this.renderable.groupColorAlpha}reset(){this.renderable=null,this.texture=null,this._batcher=null,this._batch=null,this.bounds=null}}}),o("3Xbp7",function(o,r){t(o.exports,"TexturePool",()=>a);var i=e("NbSCN"),n=e("iA5fe"),s=e("bLlTJ");let l=0,a=new class{constructor(t){this._poolKeyHash=/* @__PURE__ */Object.create(null),this._texturePool={},this.textureOptions=t||{},this.enableFullScreen=!1}createTexture(t,e,o){let r=new n.TextureSource({...this.textureOptions,width:t,height:e,resolution:1,antialias:o,autoGarbageCollect:!0});return new s.Texture({source:r,label:`texturePool_${l++}`})}getOptimalTexture(t,e,o=1,r){let n=Math.ceil(t*o-1e-6),s=Math.ceil(e*o-1e-6),l=((n=(0,i.nextPow2)(n))<<17)+((s=(0,i.nextPow2)(s))<<1)+(r?1:0);this._texturePool[l]||(this._texturePool[l]=[]);let a=this._texturePool[l].pop();return a||(a=this.createTexture(n,s,r)),a.source._resolution=o,a.source.width=n/o,a.source.height=s/o,a.source.pixelWidth=n,a.source.pixelHeight=s,a.frame.x=0,a.frame.y=0,a.frame.width=t,a.frame.height=e,a.updateUvs(),this._poolKeyHash[a.uid]=l,a}getSameSizeTexture(t,e=!1){let o=t.source;return this.getOptimalTexture(t.width,t.height,o._resolution,e)}returnTexture(t){let e=this._poolKeyHash[t.uid];this._texturePool[e].push(t)}clear(t){if(t=!1!==t)for(let t in this._texturePool){let e=this._texturePool[t];if(e)for(let t=0;t<e.length;t++)e[t].destroy(!0)}this._texturePool={}}}}),o("huPGn",function(e,o){t(e.exports,"localUniformBit",()=>r),t(e.exports,"localUniformBitGroup2",()=>i),t(e.exports,"localUniformBitGl",()=>n);let r={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},i={...r,vertex:{...r.vertex,header:r.vertex.header.replace("group(1)","group(2)")}},n={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}}}),o("6RGCN",function(o,r){t(o.exports,"CanvasPool",()=>s);var i=e("iCGeI"),n=e("NbSCN");let s=new class{constructor(t){this._canvasPool=/* @__PURE__ */Object.create(null),this.canvasOptions=t||{},this.enableFullScreen=!1}_createCanvasAndContext(t,e){let o=(0,i.DOMAdapter).get().createCanvas();o.width=t,o.height=e;let r=o.getContext("2d");return{canvas:o,context:r}}getOptimalCanvasAndContext(t,e,o=1){t=Math.ceil(t*o-1e-6),e=Math.ceil(e*o-1e-6),t=(0,n.nextPow2)(t),e=(0,n.nextPow2)(e);let r=(t<<17)+(e<<1);this._canvasPool[r]||(this._canvasPool[r]=[]);let i=this._canvasPool[r].pop();return i||(i=this._createCanvasAndContext(t,e)),i}returnCanvasAndContext(t){let{width:e,height:o}=t.canvas,r=(e<<17)+(o<<1);t.context.clearRect(0,0,e,o),this._canvasPool[r].push(t)}clear(){this._canvasPool={}}}});
//# sourceMappingURL=webworkerAll.aa8dbea8.js.map
