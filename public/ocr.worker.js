"use strict";(()=>{var Hg=Object.defineProperty;var Vg=(e,t,r)=>t in e?Hg(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var Ot=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var mo=(e,t,r)=>Vg(e,typeof t!="symbol"?t+"":t,r);var Je={};var ha=Object.defineProperty,Gg=Object.getOwnPropertyDescriptor,jg=Object.getOwnPropertyNames,Kg=Object.prototype.hasOwnProperty,Yg=(e=>typeof Ot<"u"?Ot:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof Ot<"u"?Ot:t)[r]}):e)(function(e){if(typeof Ot<"u")return Ot.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),tr=(e,t)=>{for(var r in t)ha(e,r,{get:t[r],enumerable:!0})},Xg=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of jg(t))!Kg.call(e,n)&&n!==r&&ha(e,n,{get:()=>t[n],enumerable:!(i=Gg(t,n))||i.enumerable});return e},Tr=e=>Xg(ha({},"__esModule",{value:!0}),e),dr,kt,Zt,go,Kd,Yd=P(()=>{"use strict";dr=new Map,kt=[],Zt=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=dr.get(e);if(i===void 0)dr.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let n=kt.indexOf(e);n!==-1&&kt.splice(n,1);for(let a=0;a<kt.length;a++)if(dr.get(kt[a]).priority<=r){kt.splice(a,0,e);return}kt.push(e)}return}throw new TypeError("not a valid backend")},go=async e=>{let t=dr.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},Kd=async e=>{let t=e.executionProviders||[],r=t.map(u=>typeof u=="string"?u:u.name),i=r.length===0?kt:r,n,a=[],s=new Set;for(let u of i){let d=await go(u);typeof d=="string"?a.push({name:u,err:d}):(n||(n=d),n===d&&s.add(u))}if(!n)throw new Error(`no available backend found. ERR: ${a.map(u=>`[${u.name}] ${u.err}`).join(", ")}`);for(let{name:u,err:d}of a)r.includes(u)&&console.warn(`removing requested execution provider "${u}" from session options because it is not available: ${d}`);let o=t.filter(u=>s.has(typeof u=="string"?u:u.name));return[n,new Proxy(e,{get:(u,d)=>d==="executionProviders"?o:Reflect.get(u,d)})]}}),Zg=P(()=>{"use strict";Yd()}),Xd,Qg=P(()=>{"use strict";Xd="1.22.0"}),Zi,Ge,Zd=P(()=>{"use strict";Qg(),Zi="warning",Ge={wasm:{},webgl:{},webgpu:{},versions:{common:Xd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);Zi=e}},get logLevel(){return Zi}},Object.defineProperty(Ge,"logLevel",{enumerable:!0})}),ye,Jg=P(()=>{"use strict";Zd(),ye=Ge}),Qd,Jd,e0=P(()=>{"use strict";Qd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let n,a;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[3]):(n=e.dims[3],a=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",o=t?.norm,u,d;o===void 0||o.mean===void 0?u=[255,255,255,255]:typeof o.mean=="number"?u=[o.mean,o.mean,o.mean,o.mean]:(u=[o.mean[0],o.mean[1],o.mean[2],0],o.mean[3]!==void 0&&(u[3]=o.mean[3])),o===void 0||o.bias===void 0?d=[0,0,0,0]:typeof o.bias=="number"?d=[o.bias,o.bias,o.bias,o.bias]:(d=[o.bias[0],o.bias[1],o.bias[2],0],o.bias[3]!==void 0&&(d[3]=o.bias[3]));let c=a*n,f=0,h=c,g=c*2,m=-1;s==="RGBA"?(f=0,h=c,g=c*2,m=c*3):s==="RGB"?(f=0,h=c,g=c*2):s==="RBG"&&(f=0,g=c,h=c*2);for(let _=0;_<a;_++)for(let x=0;x<n;x++){let v=(e.data[f++]-d[0])*u[0],b=(e.data[h++]-d[1])*u[1],S=(e.data[g++]-d[2])*u[2],k=m===-1?255:(e.data[m++]-d[3])*u[3];i.fillStyle="rgba("+v+","+b+","+S+","+k+")",i.fillRect(x,_,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},Jd=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let n,a,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(n=e.dims[2],a=e.dims[1],s=e.dims[3]):(n=e.dims[3],a=e.dims[2],s=e.dims[1]);let o=t!==void 0&&t.format!==void 0?t.format:"RGB",u=t?.norm,d,c;u===void 0||u.mean===void 0?d=[255,255,255,255]:typeof u.mean=="number"?d=[u.mean,u.mean,u.mean,u.mean]:(d=[u.mean[0],u.mean[1],u.mean[2],255],u.mean[3]!==void 0&&(d[3]=u.mean[3])),u===void 0||u.bias===void 0?c=[0,0,0,0]:typeof u.bias=="number"?c=[u.bias,u.bias,u.bias,u.bias]:(c=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(c[3]=u.bias[3]));let f=a*n;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let h=4,g=0,m=1,_=2,x=3,v=0,b=f,S=f*2,k=-1;o==="RGBA"?(v=0,b=f,S=f*2,k=f*3):o==="RGB"?(v=0,b=f,S=f*2):o==="RBG"&&(v=0,S=f,b=f*2),i=r.createImageData(n,a);for(let T=0;T<a*n;g+=h,m+=h,_+=h,x+=h,T++)i.data[g]=(e.data[v++]-c[0])*d[0],i.data[m]=(e.data[b++]-c[1])*d[1],i.data[_]=(e.data[S++]-c[2])*d[2],i.data[x]=k===-1?255:(e.data[k++]-c[3])*d[3]}else throw new Error("Can not access image data");return i}}),Vr,ep,tp,rp,ip,np,t0=P(()=>{"use strict";ma(),Vr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,n=t.norm??{mean:255,bias:0},a,s;typeof n.mean=="number"?a=[n.mean,n.mean,n.mean,n.mean]:a=[n.mean[0],n.mean[1],n.mean[2],n.mean[3]??255],typeof n.bias=="number"?s=[n.bias,n.bias,n.bias,n.bias]:s=[n.bias[0],n.bias[1],n.bias[2],n.bias[3]??0];let o=t.format!==void 0?t.format:"RGBA",u=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,c=u==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,h=0,g=1,m=2,_=3,x=0,v=d,b=d*2,S=-1;o==="RGB"&&(f=3,h=0,g=1,m=2,_=-1),u==="RGBA"?S=d*3:u==="RBG"?(x=0,b=d,v=d*2):u==="BGR"&&(b=0,v=d,x=d*2);for(let k=0;k<d;k++,h+=f,m+=f,g+=f,_+=f)c[x++]=(e[h]+s[0])/a[0],c[v++]=(e[g]+s[1])/a[1],c[b++]=(e[m]+s[2])/a[2],S!==-1&&_!==-1&&(c[S++]=(e[_]+s[3])/a[3]);return u==="RGBA"?new We("float32",c,[1,4,r,i]):new We("float32",c,[1,3,r,i])},ep=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,n=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,a=typeof e=="string",s,o=t??{},u=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=u();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let h=e.height,g=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(h=t.resizedHeight,g=t.resizedWidth),t!==void 0){if(o=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");o.tensorFormat="RGBA",o.height=h,o.width=g}else o.tensorFormat="RGBA",o.height=h,o.width=g;f.drawImage(e,0,0),s=f.getImageData(0,0,g,h).data}else throw new Error("Can not access image data")}else if(i){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(o=t),o.format="RGBA",o.height=c,o.width=f,t!==void 0){let h=u();h.width=f,h.height=c;let g=d(h);if(g!=null)g.putImageData(e,0,0),s=g.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(n){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=u();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let h=e.height,g=e.width;return f.drawImage(e,0,0,g,h),s=f.getImageData(0,0,g,h).data,o.height=h,o.width=g,Vr(s,o)}else throw new Error("Can not access image data")}else{if(a)return new Promise((c,f)=>{let h=u(),g=d(h);if(!e||!g)return f();let m=new Image;m.crossOrigin="Anonymous",m.src=e,m.onload=()=>{h.width=m.width,h.height=m.height,g.drawImage(m,0,0,h.width,h.height);let _=g.getImageData(0,0,h.width,h.height);o.height=h.height,o.width=h.width,c(Vr(_.data,o))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Vr(s,o);throw new Error("Input data provided is not supported - aborted tensor creation")},tp=(e,t)=>{let{width:r,height:i,download:n,dispose:a}=t,s=[1,i,r,4];return new We({location:"texture",type:"float32",texture:e,dims:s,download:n,dispose:a})},rp=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new We({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:n,dispose:a})},ip=(e,t)=>{let{dataType:r,dims:i,download:n,dispose:a}=t;return new We({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:n,dispose:a})},np=(e,t,r)=>new We({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),Dt,vr,Qi,ap,r0=P(()=>{"use strict";Dt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),vr=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),Qi=!1,ap=()=>{if(!Qi){Qi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&(Dt.set("int64",BigInt64Array),vr.set(BigInt64Array,"int64")),t&&(Dt.set("uint64",BigUint64Array),vr.set(BigUint64Array,"uint64")),i?(Dt.set("float16",r),vr.set(r,"float16")):Dt.set("float16",Uint16Array)}}}),sp,op,i0=P(()=>{"use strict";ma(),sp=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},op=(e,t)=>{switch(e.location){case"cpu":return new We(e.type,e.data,t);case"cpu-pinned":return new We({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new We({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new We({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new We({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),We,ma=P(()=>{"use strict";e0(),t0(),r0(),i0(),We=class{constructor(e,t,r){ap();let i,n;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,n=e.dims,e.location){case"cpu-pinned":{let s=Dt.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,o;if(typeof e=="string")if(i=e,o=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let u=Dt.get(e);if(u===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&u===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${u.name} as data.`);e==="uint64"||e==="int64"?s=u.from(t,BigInt):s=u.from(t)}else if(t instanceof u)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&u!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${u}`)}else if(o=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let u=typeof e[0];if(u==="string")i="string",s=e;else if(u==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${u}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let u=vr.get(e.constructor);if(u===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=u,s=e}if(o===void 0)o=[s.length];else if(!Array.isArray(o))throw new TypeError("A tensor's dims must be a number array");n=o,this.cpuData=s,this.dataLocation="cpu"}let a=sp(n);if(this.cpuData&&a!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(a/2)===this.cpuData.length))throw new Error(`Tensor's size(${a}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=n,this.size=a}static async fromImage(e,t){return ep(e,t)}static fromTexture(e,t){return tp(e,t)}static fromGpuBuffer(e,t){return rp(e,t)}static fromMLTensor(e,t){return ip(e,t)}static fromPinnedBuffer(e,t,r){return np(e,t,r)}toDataURL(e){return Qd(this,e)}toImageData(e){return Jd(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return op(this,e)}}}),Ne,up=P(()=>{"use strict";ma(),Ne=We}),si,Ji,ut,et,lp=P(()=>{"use strict";Zd(),si=(e,t)=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ji=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let n=0;n<r.length;n++){if(i&&!r[n].includes("TRACE_FUNC")){let a=`FUNC_${e}::${r[n].trim().split(" ")[1]}`;t&&(a+=`::${t}`),si("CPU",a);return}r[n].includes("TRACE_FUNC")&&(i=!0)}},ut=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||Ji("BEGIN",e)},et=e=>{(typeof Ge.trace>"u"?!Ge.wasm.trace:!Ge.trace)||Ji("END",e)}}),dp,n0=P(()=>{"use strict";Yd(),up(),lp(),dp=class pp{constructor(t){this.handler=t}async run(t,r,i){ut();let n={},a={};if(typeof t!="object"||t===null||t instanceof Ne||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof Ne)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);n[d]=null}if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let h=r[f];(h===null||h instanceof Ne)&&(d=!0,s=!1,n[f]=h)}if(d){if(typeof i=="object"&&i!==null)a=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else a=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)n[d]=null;let o=await this.handler.run(t,n,a),u={};for(let d in o)if(Object.hasOwnProperty.call(o,d)){let c=o[d];c instanceof Ne?u[d]=c:u[d]=new Ne(c.type,c.data,c.dims)}return et(),u}async release(){return this.handler.dispose()}static async create(t,r,i,n){ut();let a,s={};if(typeof t=="string"){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(a=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,h=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(h=t.byteLength-f,typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteLength' must be an integer.");if(h<=0||f+h>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof n=="object"&&n!==null)s=n;else if(typeof n<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");a=new Uint8Array(c,f,h)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[o,u]=await Kd(s),d=await o.createInferenceSessionHandler(a,u);return et(),new pp(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),lt,a0=P(()=>{"use strict";n0(),lt=dp}),s0=P(()=>{"use strict"}),o0=P(()=>{"use strict"}),u0=P(()=>{"use strict"}),l0=P(()=>{"use strict"}),d0={};tr(d0,{InferenceSession:()=>lt,TRACE:()=>si,TRACE_FUNC_BEGIN:()=>ut,TRACE_FUNC_END:()=>et,Tensor:()=>Ne,env:()=>ye,registerBackend:()=>Zt});var tt=P(()=>{"use strict";Zg(),Jg(),a0(),up(),s0(),o0(),lp(),u0(),l0()}),ga=P(()=>{"use strict"}),cp={};tr(cp,{default:()=>fp});var en,tn,fp,p0=P(()=>{"use strict";bh(),Ft(),ya(),en="ort-wasm-proxy-worker",tn=globalThis.self?.name===en,tn&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":_a(r.wasm).then(()=>{Ba(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:n}=r;Na(n,i).then(()=>{postMessage({type:t})},a=>{postMessage({type:t,err:a})});break}case"copy-from":{let{buffer:i}=r,n=fi(i);postMessage({type:t,out:n});break}case"create":{let{model:i,options:n}=r;Da(i,n).then(a=>{postMessage({type:t,out:a})},a=>{postMessage({type:t,err:a})});break}case"release":Pa(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:n,inputs:a,outputIndices:s,options:o}=r;La(i,n,a,s,new Array(s.length).fill(null),o).then(u=>{u.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:u},Wa([...a,...u]))},u=>{postMessage({type:t,err:u})});break}case"end-profiling":Ua(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),fp=tn?null:e=>new Worker(e??Ue,{type:"module",name:en})}),hp={};tr(hp,{default:()=>mp});var rn,nn,mp,yo,c0=P(()=>{"use strict";nn=(rn=Je.url,async function(e={}){var t,r,i=e,n=new Promise((l,p)=>{t=l,r=p}),a=typeof window=="object",s=typeof WorkerGlobalScope<"u",o=s&&self.name?.startsWith("em-pthread");i.mountExternalData=(l,p)=>{l.startsWith("./")&&(l=l.substring(2)),(i.Fb||(i.Fb=new Map)).set(l,p)},i.unmountExternalData=()=>{delete i.Fb};var u=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let d=l=>async(...p)=>{try{if(i.Gb)throw Error("Session already started");let y=i.Gb={ec:p[0],errors:[]},w=await l(...p);if(i.Gb!==y)throw Error("Session mismatch");i.Kb?.flush();let $=y.errors;if(0<$.length){let I=await Promise.all($);if(I=I.filter(M=>M),0<I.length)throw Error(I.join(`
`))}return w}finally{i.Gb=null}};i.jsepInit=(l,p)=>{if(l==="webgpu"){[i.Kb,i.Vb,i.Zb,i.Lb,i.Yb,i.kb,i.$b,i.bc,i.Wb,i.Xb,i.ac]=p;let y=i.Kb;i.jsepRegisterBuffer=(w,$,I,M)=>y.registerBuffer(w,$,I,M),i.jsepGetBuffer=w=>y.getBuffer(w),i.jsepCreateDownloader=(w,$,I)=>y.createDownloader(w,$,I),i.jsepOnCreateSession=w=>{y.onCreateSession(w)},i.jsepOnReleaseSession=w=>{y.onReleaseSession(w)},i.jsepOnRunStart=w=>y.onRunStart(w),i.cc=(w,$)=>{y.upload(w,$)}}else if(l==="webnn"){let y=p[0];[i.oc,i.Ob,i.webnnEnsureTensor,i.Pb,i.webnnDownloadTensor]=p.slice(1),i.webnnReleaseTensorId=i.Ob,i.webnnUploadTensor=i.Pb,i.webnnOnRunStart=w=>y.onRunStart(w),i.webnnOnRunEnd=y.onRunEnd.bind(y),i.webnnRegisterMLContext=(w,$)=>{y.registerMLContext(w,$)},i.webnnOnReleaseSession=w=>{y.onReleaseSession(w)},i.webnnCreateMLTensorDownloader=(w,$)=>y.createMLTensorDownloader(w,$),i.webnnRegisterMLTensor=(w,$,I,M)=>y.registerMLTensor(w,$,I,M),i.webnnCreateMLContext=w=>y.createMLContext(w),i.webnnRegisterMLConstant=(w,$,I,M,D,W)=>y.registerMLConstant(w,$,I,M,D,i.Fb,W),i.webnnRegisterGraphInput=y.registerGraphInput.bind(y),i.webnnIsGraphInput=y.isGraphInput.bind(y),i.webnnRegisterGraphOutput=y.registerGraphOutput.bind(y),i.webnnIsGraphOutput=y.isGraphOutput.bind(y),i.webnnCreateTemporaryTensor=y.createTemporaryTensor.bind(y),i.webnnIsGraphInputOutputTypeSupported=y.isGraphInputOutputTypeSupported.bind(y)}};let c=()=>{let l=(p,y,w)=>(...$)=>{let I=at,M=y?.();$=p(...$);let D=y?.();return M!==D&&(p=D,w(M),y=w=null),at!=I?new Promise((W,K)=>{Fi={resolve:W,reject:K}}):$};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[p]=l(i[p],()=>i[p],y=>i[p]=y)})(),d!==void 0&&(i._OrtRun=d(i._OrtRun),i._OrtRunWithBinding=d(i._OrtRunWithBinding)),c=void 0};i.asyncInit=()=>{c?.()};var f,h,g=Object.assign({},i),m=(l,p)=>{throw p},_="";(a||s)&&(s?_=self.location.href:typeof document<"u"&&document.currentScript&&(_=document.currentScript.src),rn&&(_=rn),_=_.startsWith("blob:")?"":_.slice(0,_.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(h=l=>{var p=new XMLHttpRequest;return p.open("GET",l,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=async l=>{if(j(l))return new Promise((y,w)=>{var $=new XMLHttpRequest;$.open("GET",l,!0),$.responseType="arraybuffer",$.onload=()=>{$.status==200||$.status==0&&$.response?y($.response):w($.status)},$.onerror=w,$.send(null)});var p=await fetch(l,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)});var x=console.log.bind(console),v=console.error.bind(console),b=x,S=v;Object.assign(i,g),g=null;var k,T,C,E,z,N,q,Q,V,te,L,ie,X,F=i.wasmBinary,ue=!1,j=l=>l.startsWith("file://");function le(){return k.buffer!=E.buffer&&Be(),E}function B(){return k.buffer!=E.buffer&&Be(),z}function U(){return k.buffer!=E.buffer&&Be(),N}function re(){return k.buffer!=E.buffer&&Be(),q}function O(){return k.buffer!=E.buffer&&Be(),Q}function ne(){return k.buffer!=E.buffer&&Be(),V}function Oe(){return k.buffer!=E.buffer&&Be(),te}function Fe(){return k.buffer!=E.buffer&&Be(),X}if(o){let l=function(p){try{var y=p.data,w=y.Cb;if(w==="load"){let $=[];self.onmessage=I=>$.push(I),self.startWorker=()=>{postMessage({Cb:"loaded"});for(let I of $)l(I);self.onmessage=l};for(let I of y.Sb)i[I]&&!i[I].proxy||(i[I]=(...M)=>{postMessage({Cb:"callHandler",Rb:I,args:M})},I=="print"&&(b=i[I]),I=="printErr"&&(S=i[I]));k=y.lc,Be(),be(y.mc)}else if(w==="run"){km(y.Bb),ji(y.Bb,0,0,1,0,0),us(),Wi(y.Bb),Le||(ro(),Le=!0);try{Sm(y.hc,y.Ib)}catch($){if($!="unwind")throw $}}else y.target!=="setimmediate"&&(w==="checkMailbox"?Le&&Rr():w&&(S(`worker: received unknown command ${w}`),S(y)))}catch($){throw io(),$}};var ke=l,be,Le=!1;S=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Cb:"alert",text:p.join(" "),jc:qr()})},self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=l}function Be(){var l=k.buffer;i.HEAP8=E=new Int8Array(l),i.HEAP16=N=new Int16Array(l),i.HEAPU8=z=new Uint8Array(l),i.HEAPU16=q=new Uint16Array(l),i.HEAP32=Q=new Int32Array(l),i.HEAPU32=V=new Uint32Array(l),i.HEAPF32=te=new Float32Array(l),i.HEAPF64=X=new Float64Array(l),i.HEAP64=L=new BigInt64Array(l),i.HEAPU64=ie=new BigUint64Array(l)}function Mr(){o?startWorker(i):Z.Da()}o||(k=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Be());var Ei,sr=0,or=null;function ts(){if(--sr==0&&or){var l=or;or=null,l()}}function _t(l){throw S(l="Aborted("+l+")"),ue=!0,l=new WebAssembly.RuntimeError(l+". Build with -sASSERTIONS for more info."),r(l),l}function rs(){return{a:{L:xm,Aa:$m,b:Im,$:cs,A:ms,pa:gs,X:_s,Z:bs,qa:ws,na:vs,ga:$s,ma:xs,J:ks,Y:Ss,V:Ts,oa:Is,W:Cs,va:Cm,E:Am,Q:zm,O:Mm,D:Bm,v:Nm,r:Dm,P:Pm,z:Vm,R:Gm,ja:jm,T:Km,aa:Ym,M:Xm,F:Zm,ia:Wi,sa:Qm,t:Jm,Ca:eg,w:ig,o:ng,m:sg,c:Pi,Ba:og,n:ug,j:pg,u:cg,p:fg,f:hg,s:mg,l:gg,e:yg,k:_g,h:bg,g:wg,d:vg,da:$g,ea:xg,fa:kg,ba:qs,ca:Fs,N:Hs,xa:Tg,ua:Eg,i:Ag,C:zg,G:Og,ta:Ig,x:Mg,ra:Rg,U:Bg,q:Sg,y:Ng,K:Dg,S:Pg,za:Lg,ya:Ug,ka:Ks,la:Ys,_:Ri,B:Xs,I:Zs,ha:Qs,H:Js,a:k,wa:Mi}}}var Ai={840156:(l,p,y,w,$)=>{if(i===void 0||!i.Fb)return 1;if((l=$e(Number(l>>>0))).startsWith("./")&&(l=l.substring(2)),!(l=i.Fb.get(l)))return 2;if(p=Number(p>>>0),y=Number(y>>>0),w=Number(w>>>0),p+y>l.byteLength)return 3;try{let I=l.subarray(p,p+y);switch($){case 0:B().set(I,w>>>0);break;case 1:i.nc?i.nc(w,I):i.cc(w,I);break;default:return 4}return 0}catch{return 4}},840980:(l,p,y)=>{i.Pb(l,B().subarray(p>>>0,p+y>>>0))},841044:()=>i.oc(),841086:l=>{i.Ob(l)},841123:()=>{i.Wb()},841154:()=>{i.Xb()},841183:()=>{i.ac()},841208:l=>i.Vb(l),841241:l=>i.Zb(l),841273:(l,p,y)=>{i.Lb(Number(l),Number(p),Number(y),!0)},841336:(l,p,y)=>{i.Lb(Number(l),Number(p),Number(y))},841393:()=>typeof wasmOffsetConverter<"u",841450:l=>{i.kb("Abs",l,void 0)},841501:l=>{i.kb("Neg",l,void 0)},841552:l=>{i.kb("Floor",l,void 0)},841605:l=>{i.kb("Ceil",l,void 0)},841657:l=>{i.kb("Reciprocal",l,void 0)},841715:l=>{i.kb("Sqrt",l,void 0)},841767:l=>{i.kb("Exp",l,void 0)},841818:l=>{i.kb("Erf",l,void 0)},841869:l=>{i.kb("Sigmoid",l,void 0)},841924:(l,p,y)=>{i.kb("HardSigmoid",l,{alpha:p,beta:y})},842003:l=>{i.kb("Log",l,void 0)},842054:l=>{i.kb("Sin",l,void 0)},842105:l=>{i.kb("Cos",l,void 0)},842156:l=>{i.kb("Tan",l,void 0)},842207:l=>{i.kb("Asin",l,void 0)},842259:l=>{i.kb("Acos",l,void 0)},842311:l=>{i.kb("Atan",l,void 0)},842363:l=>{i.kb("Sinh",l,void 0)},842415:l=>{i.kb("Cosh",l,void 0)},842467:l=>{i.kb("Asinh",l,void 0)},842520:l=>{i.kb("Acosh",l,void 0)},842573:l=>{i.kb("Atanh",l,void 0)},842626:l=>{i.kb("Tanh",l,void 0)},842678:l=>{i.kb("Not",l,void 0)},842729:(l,p,y)=>{i.kb("Clip",l,{min:p,max:y})},842798:l=>{i.kb("Clip",l,void 0)},842850:(l,p)=>{i.kb("Elu",l,{alpha:p})},842908:l=>{i.kb("Gelu",l,void 0)},842960:l=>{i.kb("Relu",l,void 0)},843012:(l,p)=>{i.kb("LeakyRelu",l,{alpha:p})},843076:(l,p)=>{i.kb("ThresholdedRelu",l,{alpha:p})},843146:(l,p)=>{i.kb("Cast",l,{to:p})},843204:l=>{i.kb("Add",l,void 0)},843255:l=>{i.kb("Sub",l,void 0)},843306:l=>{i.kb("Mul",l,void 0)},843357:l=>{i.kb("Div",l,void 0)},843408:l=>{i.kb("Pow",l,void 0)},843459:l=>{i.kb("Equal",l,void 0)},843512:l=>{i.kb("Greater",l,void 0)},843567:l=>{i.kb("GreaterOrEqual",l,void 0)},843629:l=>{i.kb("Less",l,void 0)},843681:l=>{i.kb("LessOrEqual",l,void 0)},843740:(l,p,y,w,$)=>{i.kb("ReduceMean",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},843915:(l,p,y,w,$)=>{i.kb("ReduceMax",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844089:(l,p,y,w,$)=>{i.kb("ReduceMin",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844263:(l,p,y,w,$)=>{i.kb("ReduceProd",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844438:(l,p,y,w,$)=>{i.kb("ReduceSum",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844612:(l,p,y,w,$)=>{i.kb("ReduceL1",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844785:(l,p,y,w,$)=>{i.kb("ReduceL2",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},844958:(l,p,y,w,$)=>{i.kb("ReduceLogSum",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},845135:(l,p,y,w,$)=>{i.kb("ReduceSumSquare",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},845315:(l,p,y,w,$)=>{i.kb("ReduceLogSumExp",l,{keepDims:!!p,noopWithEmptyAxes:!!y,axes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},845495:l=>{i.kb("Where",l,void 0)},845548:(l,p,y)=>{i.kb("Transpose",l,{perm:p?Array.from(O().subarray(Number(p)>>>0,Number(y)>>>0)):[]})},845672:(l,p,y,w)=>{i.kb("DepthToSpace",l,{blocksize:p,mode:$e(y),format:w?"NHWC":"NCHW"})},845805:(l,p,y,w)=>{i.kb("DepthToSpace",l,{blocksize:p,mode:$e(y),format:w?"NHWC":"NCHW"})},845938:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce,Yt)=>{i.kb("ConvTranspose",l,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[y],group:w,kernelShape:[$],pads:[I,M],strides:[D],wIsConst:()=>!!le()[K>>>0],outputPadding:oe?Array.from(O().subarray(Number(oe)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from(O().subarray(Number(me)>>>0,Number(Ce)>>>0)):[],activation:$e(Yt)})},846371:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("ConvTranspose",l,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(O().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:w,kernelShape:Array.from(O().subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from(O().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(O().subarray(Number(M)>>>0,2+(Number(M)>>>0)>>>0)),wIsConst:()=>!!le()[W>>>0],outputPadding:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],outputShape:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:$e(Ce)})},847032:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce,Yt)=>{i.kb("ConvTranspose",l,{format:W?"NHWC":"NCHW",autoPad:p,dilations:[y],group:w,kernelShape:[$],pads:[I,M],strides:[D],wIsConst:()=>!!le()[K>>>0],outputPadding:oe?Array.from(O().subarray(Number(oe)>>>0,Number(pe)>>>0)):[],outputShape:me?Array.from(O().subarray(Number(me)>>>0,Number(Ce)>>>0)):[],activation:$e(Yt)})},847465:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("ConvTranspose",l,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(O().subarray(Number(y)>>>0,2+(Number(y)>>>0)>>>0)),group:w,kernelShape:Array.from(O().subarray(Number($)>>>0,2+(Number($)>>>0)>>>0)),pads:Array.from(O().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(O().subarray(Number(M)>>>0,2+(Number(M)>>>0)>>>0)),wIsConst:()=>!!le()[W>>>0],outputPadding:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],outputShape:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[],activation:$e(Ce)})},848126:(l,p)=>{i.kb("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},848217:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("AveragePool",l,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:w,storage_order:$,dilations:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:D?Array.from(O().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],strides:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},848696:(l,p)=>{i.kb("GlobalAveragePool",l,{format:p?"NHWC":"NCHW"})},848787:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("AveragePool",l,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:w,storage_order:$,dilations:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:D?Array.from(O().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],strides:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},849266:(l,p)=>{i.kb("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},849353:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("MaxPool",l,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:w,storage_order:$,dilations:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:D?Array.from(O().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],strides:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},849828:(l,p)=>{i.kb("GlobalMaxPool",l,{format:p?"NHWC":"NCHW"})},849915:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce)=>{i.kb("MaxPool",l,{format:Ce?"NHWC":"NCHW",auto_pad:p,ceil_mode:y,count_include_pad:w,storage_order:$,dilations:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[],kernel_shape:D?Array.from(O().subarray(Number(D)>>>0,Number(W)>>>0)):[],pads:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],strides:pe?Array.from(O().subarray(Number(pe)>>>0,Number(me)>>>0)):[]})},850390:(l,p,y,w,$)=>{i.kb("Gemm",l,{alpha:p,beta:y,transA:w,transB:$})},850494:l=>{i.kb("MatMul",l,void 0)},850548:(l,p,y,w)=>{i.kb("ArgMax",l,{keepDims:!!p,selectLastIndex:!!y,axis:w})},850656:(l,p,y,w)=>{i.kb("ArgMin",l,{keepDims:!!p,selectLastIndex:!!y,axis:w})},850764:(l,p)=>{i.kb("Softmax",l,{axis:p})},850827:(l,p)=>{i.kb("Concat",l,{axis:p})},850887:(l,p,y,w,$)=>{i.kb("Split",l,{axis:p,numOutputs:y,splitSizes:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},851043:l=>{i.kb("Expand",l,void 0)},851097:(l,p)=>{i.kb("Gather",l,{axis:Number(p)})},851168:(l,p)=>{i.kb("GatherElements",l,{axis:Number(p)})},851247:(l,p)=>{i.kb("GatherND",l,{batch_dims:Number(p)})},851326:(l,p,y,w,$,I,M,D,W,K,oe)=>{i.kb("Resize",l,{antialias:p,axes:y?Array.from(O().subarray(Number(y)>>>0,Number(w)>>>0)):[],coordinateTransformMode:$e($),cubicCoeffA:I,excludeOutside:M,extrapolationValue:D,keepAspectRatioPolicy:$e(W),mode:$e(K),nearestMode:$e(oe)})},851688:(l,p,y,w,$,I,M)=>{i.kb("Slice",l,{starts:p?Array.from(O().subarray(Number(p)>>>0,Number(y)>>>0)):[],ends:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[],axes:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[]})},851952:l=>{i.kb("Tile",l,void 0)},852004:(l,p,y)=>{i.kb("InstanceNormalization",l,{epsilon:p,format:y?"NHWC":"NCHW"})},852118:(l,p,y)=>{i.kb("InstanceNormalization",l,{epsilon:p,format:y?"NHWC":"NCHW"})},852232:l=>{i.kb("Range",l,void 0)},852285:(l,p)=>{i.kb("Einsum",l,{equation:$e(p)})},852366:(l,p,y,w,$)=>{i.kb("Pad",l,{mode:p,value:y,pads:w?Array.from(O().subarray(Number(w)>>>0,Number($)>>>0)):[]})},852509:(l,p,y,w,$,I)=>{i.kb("BatchNormalization",l,{epsilon:p,momentum:y,spatial:!!$,trainingMode:!!w,format:I?"NHWC":"NCHW"})},852678:(l,p,y,w,$,I)=>{i.kb("BatchNormalization",l,{epsilon:p,momentum:y,spatial:!!$,trainingMode:!!w,format:I?"NHWC":"NCHW"})},852847:(l,p,y)=>{i.kb("CumSum",l,{exclusive:Number(p),reverse:Number(y)})},852944:(l,p,y)=>{i.kb("DequantizeLinear",l,{axis:p,blockSize:y})},853034:(l,p,y,w,$)=>{i.kb("GridSample",l,{align_corners:p,mode:$e(y),padding_mode:$e(w),format:$?"NHWC":"NCHW"})},853204:(l,p,y,w,$)=>{i.kb("GridSample",l,{align_corners:p,mode:$e(y),padding_mode:$e(w),format:$?"NHWC":"NCHW"})},853374:(l,p)=>{i.kb("ScatterND",l,{reduction:$e(p)})},853459:(l,p,y,w,$,I,M,D,W)=>{i.kb("Attention",l,{numHeads:p,isUnidirectional:y,maskFilterValue:w,scale:$,doRotary:I,qkvHiddenSizes:M?Array.from(O().subarray(Number(D)>>>0,Number(D)+M>>>0)):[],pastPresentShareBuffer:!!W})},853731:l=>{i.kb("BiasAdd",l,void 0)},853786:l=>{i.kb("BiasSplitGelu",l,void 0)},853847:l=>{i.kb("FastGelu",l,void 0)},853903:(l,p,y,w,$,I,M,D,W,K,oe,pe,me,Ce,Yt,Fg)=>{i.kb("Conv",l,{format:pe?"NHWC":"NCHW",auto_pad:p,dilations:y?Array.from(O().subarray(Number(y)>>>0,Number(w)>>>0)):[],group:$,kernel_shape:I?Array.from(O().subarray(Number(I)>>>0,Number(M)>>>0)):[],pads:D?Array.from(O().subarray(Number(D)>>>0,Number(W)>>>0)):[],strides:K?Array.from(O().subarray(Number(K)>>>0,Number(oe)>>>0)):[],w_is_const:()=>!!le()[Number(me)>>>0],activation:$e(Ce),activation_params:Yt?Array.from(Oe().subarray(Number(Yt)>>>0,Number(Fg)>>>0)):[]})},854487:l=>{i.kb("Gelu",l,void 0)},854539:(l,p,y,w,$,I,M,D,W)=>{i.kb("GroupQueryAttention",l,{numHeads:p,kvNumHeads:y,scale:w,softcap:$,doRotary:I,rotaryInterleaved:M,smoothSoftmax:D,localWindowSize:W})},854756:(l,p,y,w)=>{i.kb("LayerNormalization",l,{axis:p,epsilon:y,simplified:!!w})},854867:(l,p,y,w)=>{i.kb("LayerNormalization",l,{axis:p,epsilon:y,simplified:!!w})},854978:(l,p,y,w,$,I)=>{i.kb("MatMulNBits",l,{k:p,n:y,accuracyLevel:w,bits:$,blockSize:I})},855105:(l,p,y,w,$,I)=>{i.kb("MultiHeadAttention",l,{numHeads:p,isUnidirectional:y,maskFilterValue:w,scale:$,doRotary:I})},855264:(l,p)=>{i.kb("QuickGelu",l,{alpha:p})},855328:(l,p,y,w,$)=>{i.kb("RotaryEmbedding",l,{interleaved:!!p,numHeads:y,rotaryEmbeddingDim:w,scale:$})},855467:(l,p,y)=>{i.kb("SkipLayerNormalization",l,{epsilon:p,simplified:!!y})},855569:(l,p,y)=>{i.kb("SkipLayerNormalization",l,{epsilon:p,simplified:!!y})},855671:(l,p,y,w)=>{i.kb("GatherBlockQuantized",l,{gatherAxis:p,quantizeAxis:y,blockSize:w})},855792:l=>{i.$b(l)},855826:(l,p)=>i.bc(Number(l),Number(p),i.Gb.ec,i.Gb.errors)};function $m(l,p,y){return Ns(async()=>{await i.Yb(Number(l),Number(p),Number(y))})}function xm(){return typeof wasmOffsetConverter<"u"}class zi{constructor(p){mo(this,"name","ExitStatus");this.message=`Program terminated with exit(${p})`,this.status=p}}var is=l=>{l.terminate(),l.onmessage=()=>{}},Oi=[],ns=l=>{wt.length==0&&(ds(),ls(wt[0]));var p=wt.pop();if(!p)return 6;ur.push(p),zt[l.Bb]=p,p.Bb=l.Bb;var y={Cb:"run",hc:l.fc,Ib:l.Ib,Bb:l.Bb};return p.postMessage(y,l.Nb),0},bt=0,_e=(l,p,...y)=>{for(var w=2*y.length,$=Xi(),I=Yi(8*w),M=I>>>3,D=0;D<y.length;D++){var W=y[D];typeof W=="bigint"?(L[M+2*D]=1n,L[M+2*D+1]=W):(L[M+2*D]=0n,Fe()[M+2*D+1>>>0]=W)}return l=no(l,0,w,I,p),Hr($),l};function Mi(l){if(o)return _e(0,1,l);if(C=l,!(0<bt)){for(var p of ur)is(p);for(p of wt)is(p);wt=[],ur=[],zt={},ue=!0}m(0,new zi(l))}function as(l){if(o)return _e(1,0,l);Ri(l)}var Ri=l=>{if(C=l,o)throw as(l),"unwind";Mi(l)},wt=[],ur=[],ss=[],zt={},os=l=>{var p=l.Bb;delete zt[p],wt.push(l),ur.splice(ur.indexOf(l),1),l.Bb=0,ao(p)};function us(){ss.forEach(l=>l())}var ls=l=>new Promise(p=>{l.onmessage=$=>{var I=($=$.data).Cb;if($.Hb&&$.Hb!=qr()){var M=zt[$.Hb];M?M.postMessage($,$.Nb):S(`Internal error! Worker sent a message "${I}" to target pthread ${$.Hb}, but that thread no longer exists!`)}else I==="checkMailbox"?Rr():I==="spawnThread"?ns($):I==="cleanupThread"?os(zt[$.ic]):I==="loaded"?(l.loaded=!0,p(l)):I==="alert"?alert(`Thread ${$.jc}: ${$.text}`):$.target==="setimmediate"?l.postMessage($):I==="callHandler"?i[$.Rb](...$.args):I&&S(`worker sent an unknown command ${I}`)},l.onerror=$=>{throw S(`worker sent an error! ${$.filename}:${$.lineno}: ${$.message}`),$};var y,w=[];for(y of[])i.propertyIsEnumerable(y)&&w.push(y);l.postMessage({Cb:"load",Sb:w,lc:k,mc:T})});function ds(){var l=new Worker((()=>{let p=URL;return Je.url>"file:"&&Je.url<"file;"?new p("ort.bundle.min.mjs",Je.url):new URL(Je.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});wt.push(l)}var km=l=>{Be();var p=ne()[l+52>>>2>>>0];l=ne()[l+56>>>2>>>0],uo(p,p-l),Hr(p)},Sm=(l,p)=>{bt=0,l=lo(l,p),0<bt?C=l:Ki(l)};class Tm{constructor(p){this.Jb=p-24}}function Im(l,p,y){var w=new Tm(l>>>=0);throw p>>>=0,y>>>=0,ne()[w.Jb+16>>>2>>>0]=0,ne()[w.Jb+4>>>2>>>0]=p,ne()[w.Jb+8>>>2>>>0]=y,l}function ps(l,p,y,w){return o?_e(2,1,l,p,y,w):cs(l,p,y,w)}function cs(l,p,y,w){if(l>>>=0,y>>>=0,w>>>=0,u===void 0)return 6;var $=[];return o&&$.length===0?ps(l,p>>>=0,y,w):(l={fc:y,Bb:l,Ib:w,Nb:$},o?(l.Cb="spawnThread",postMessage(l,$),0):ns(l))}var fs=typeof TextDecoder<"u"?new TextDecoder:void 0,hs=(l,p=0,y=NaN)=>{var w=(p>>>=0)+y;for(y=p;l[y]&&!(y>=w);)++y;if(16<y-p&&l.buffer&&fs)return fs.decode(l.buffer instanceof ArrayBuffer?l.subarray(p,y):l.slice(p,y));for(w="";p<y;){var $=l[p++];if(128&$){var I=63&l[p++];if((224&$)==192)w+=String.fromCharCode((31&$)<<6|I);else{var M=63&l[p++];65536>($=(240&$)==224?(15&$)<<12|I<<6|M:(7&$)<<18|I<<12|M<<6|63&l[p++])?w+=String.fromCharCode($):($-=65536,w+=String.fromCharCode(55296|$>>10,56320|1023&$))}}else w+=String.fromCharCode($)}return w},$e=(l,p)=>(l>>>=0)?hs(B(),l,p):"";function ms(l,p,y){return o?_e(3,1,l,p,y):0}function gs(l,p){if(o)return _e(4,1,l,p)}var ys=l=>{for(var p=0,y=0;y<l.length;++y){var w=l.charCodeAt(y);127>=w?p++:2047>=w?p+=2:55296<=w&&57343>=w?(p+=4,++y):p+=3}return p},jt=(l,p,y)=>{var w=B();if(p>>>=0,0<y){var $=p;y=p+y-1;for(var I=0;I<l.length;++I){var M=l.charCodeAt(I);if(55296<=M&&57343>=M&&(M=65536+((1023&M)<<10)|1023&l.charCodeAt(++I)),127>=M){if(p>=y)break;w[p++>>>0]=M}else{if(2047>=M){if(p+1>=y)break;w[p++>>>0]=192|M>>6}else{if(65535>=M){if(p+2>=y)break;w[p++>>>0]=224|M>>12}else{if(p+3>=y)break;w[p++>>>0]=240|M>>18,w[p++>>>0]=128|M>>12&63}w[p++>>>0]=128|M>>6&63}w[p++>>>0]=128|63&M}}w[p>>>0]=0,l=p-$}else l=0;return l};function _s(l,p){if(o)return _e(5,1,l,p)}function bs(l,p,y){if(o)return _e(6,1,l,p,y)}function ws(l,p,y){return o?_e(7,1,l,p,y):0}function vs(l,p){if(o)return _e(8,1,l,p)}function $s(l,p,y){if(o)return _e(9,1,l,p,y)}function xs(l,p,y,w){if(o)return _e(10,1,l,p,y,w)}function ks(l,p,y,w){if(o)return _e(11,1,l,p,y,w)}function Ss(l,p,y,w){if(o)return _e(12,1,l,p,y,w)}function Ts(l){if(o)return _e(13,1,l)}function Is(l,p){if(o)return _e(14,1,l,p)}function Cs(l,p,y){if(o)return _e(15,1,l,p,y)}var Es,vt,Cm=()=>_t(""),nt=l=>{for(var p="";B()[l>>>0];)p+=Es[B()[l++>>>0]];return p},Bi={},Ni={},Em={};function pt(l,p,y={}){return(function(w,$,I={}){var M=$.name;if(!w)throw new vt(`type "${M}" must have a positive integer typeid pointer`);if(Ni.hasOwnProperty(w)){if(I.Tb)return;throw new vt(`Cannot register type '${M}' twice`)}Ni[w]=$,delete Em[w],Bi.hasOwnProperty(w)&&($=Bi[w],delete Bi[w],$.forEach(D=>D()))})(l,p,y)}var As=(l,p,y)=>{switch(p){case 1:return y?w=>le()[w>>>0]:w=>B()[w>>>0];case 2:return y?w=>U()[w>>>1>>>0]:w=>re()[w>>>1>>>0];case 4:return y?w=>O()[w>>>2>>>0]:w=>ne()[w>>>2>>>0];case 8:return y?w=>L[w>>>3]:w=>ie[w>>>3];default:throw new TypeError(`invalid integer width (${p}): ${l}`)}};function Am(l,p,y){y>>>=0,pt(l>>>=0,{name:p=nt(p>>>0),fromWireType:w=>w,toWireType:function(w,$){if(typeof $!="bigint"&&typeof $!="number")throw $=$===null?"null":(w=typeof $)=="object"||w==="array"||w==="function"?$.toString():""+$,new TypeError(`Cannot convert "${$}" to ${this.name}`);return typeof $=="number"&&($=BigInt($)),$},Db:$t,readValueFromPointer:As(p,y,p.indexOf("u")==-1),Eb:null})}var $t=8;function zm(l,p,y,w){pt(l>>>=0,{name:p=nt(p>>>0),fromWireType:function($){return!!$},toWireType:function($,I){return I?y:w},Db:$t,readValueFromPointer:function($){return this.fromWireType(B()[$>>>0])},Eb:null})}var Di=[],ct=[];function Pi(l){9<(l>>>=0)&&--ct[l+1]==0&&(ct[l]=void 0,Di.push(l))}var Me=l=>{if(!l)throw new vt("Cannot use deleted val. handle = "+l);return ct[l]},He=l=>{switch(l){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=Di.pop()||ct.length;return ct[p]=l,ct[p+1]=1,p}};function Li(l){return this.fromWireType(ne()[l>>>2>>>0])}var Om={name:"emscripten::val",fromWireType:l=>{var p=Me(l);return Pi(l),p},toWireType:(l,p)=>He(p),Db:$t,readValueFromPointer:Li,Eb:null};function Mm(l){return pt(l>>>0,Om)}var Rm=(l,p)=>{switch(p){case 4:return function(y){return this.fromWireType(Oe()[y>>>2>>>0])};case 8:return function(y){return this.fromWireType(Fe()[y>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${l}`)}};function Bm(l,p,y){y>>>=0,pt(l>>>=0,{name:p=nt(p>>>0),fromWireType:w=>w,toWireType:(w,$)=>$,Db:$t,readValueFromPointer:Rm(p,y),Eb:null})}function Nm(l,p,y,w,$){if(l>>>=0,y>>>=0,p=nt(p>>>0),$===-1&&($=4294967295),$=D=>D,w===0){var I=32-8*y;$=D=>D<<I>>>I}var M=p.includes("unsigned")?function(D,W){return W>>>0}:function(D,W){return W};pt(l,{name:p,fromWireType:$,toWireType:M,Db:$t,readValueFromPointer:As(p,y,w!==0),Eb:null})}function Dm(l,p,y){function w(I){var M=ne()[I>>>2>>>0];return I=ne()[I+4>>>2>>>0],new $(le().buffer,I,M)}var $=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];pt(l>>>=0,{name:y=nt(y>>>0),fromWireType:w,Db:$t,readValueFromPointer:w},{Tb:!0})}function Pm(l,p){pt(l>>>=0,{name:p=nt(p>>>0),fromWireType:function(y){for(var w,$=ne()[y>>>2>>>0],I=y+4,M=I,D=0;D<=$;++D){var W=I+D;D!=$&&B()[W>>>0]!=0||(M=$e(M,W-M),w===void 0?w=M:(w+="\0",w+=M),M=W+1)}return st(y),w},toWireType:function(y,w){w instanceof ArrayBuffer&&(w=new Uint8Array(w));var $=typeof w=="string";if(!($||w instanceof Uint8Array||w instanceof Uint8ClampedArray||w instanceof Int8Array))throw new vt("Cannot pass non-string to std::string");var I=$?ys(w):w.length,M=Fr(4+I+1),D=M+4;if(ne()[M>>>2>>>0]=I,$)jt(w,D,I+1);else if($)for($=0;$<I;++$){var W=w.charCodeAt($);if(255<W)throw st(M),new vt("String has UTF-16 code units that do not fit in 8 bits");B()[D+$>>>0]=W}else for($=0;$<I;++$)B()[D+$>>>0]=w[$];return y!==null&&y.push(st,M),M},Db:$t,readValueFromPointer:Li,Eb(y){st(y)}})}var zs=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,Lm=(l,p)=>{for(var y=l>>1,w=y+p/2;!(y>=w)&&re()[y>>>0];)++y;if(32<(y<<=1)-l&&zs)return zs.decode(B().slice(l,y));for(y="",w=0;!(w>=p/2);++w){var $=U()[l+2*w>>>1>>>0];if($==0)break;y+=String.fromCharCode($)}return y},Um=(l,p,y)=>{if(y??(y=2147483647),2>y)return 0;var w=p;y=(y-=2)<2*l.length?y/2:l.length;for(var $=0;$<y;++$){var I=l.charCodeAt($);U()[p>>>1>>>0]=I,p+=2}return U()[p>>>1>>>0]=0,p-w},Wm=l=>2*l.length,qm=(l,p)=>{for(var y=0,w="";!(y>=p/4);){var $=O()[l+4*y>>>2>>>0];if($==0)break;++y,65536<=$?($-=65536,w+=String.fromCharCode(55296|$>>10,56320|1023&$)):w+=String.fromCharCode($)}return w},Fm=(l,p,y)=>{if(p>>>=0,y??(y=2147483647),4>y)return 0;var w=p;y=w+y-4;for(var $=0;$<l.length;++$){var I=l.charCodeAt($);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&l.charCodeAt(++$)),O()[p>>>2>>>0]=I,(p+=4)+4>y)break}return O()[p>>>2>>>0]=0,p-w},Hm=l=>{for(var p=0,y=0;y<l.length;++y){var w=l.charCodeAt(y);55296<=w&&57343>=w&&++y,p+=4}return p};function Vm(l,p,y){if(l>>>=0,p>>>=0,y=nt(y>>>=0),p===2)var w=Lm,$=Um,I=Wm,M=D=>re()[D>>>1>>>0];else p===4&&(w=qm,$=Fm,I=Hm,M=D=>ne()[D>>>2>>>0]);pt(l,{name:y,fromWireType:D=>{for(var W,K=ne()[D>>>2>>>0],oe=D+4,pe=0;pe<=K;++pe){var me=D+4+pe*p;pe!=K&&M(me)!=0||(oe=w(oe,me-oe),W===void 0?W=oe:(W+="\0",W+=oe),oe=me+p)}return st(D),W},toWireType:(D,W)=>{if(typeof W!="string")throw new vt(`Cannot pass non-string to C++ string type ${y}`);var K=I(W),oe=Fr(4+K+p);return ne()[oe>>>2>>>0]=K/p,$(W,oe+4,K+p),D!==null&&D.push(st,oe),oe},Db:$t,readValueFromPointer:Li,Eb(D){st(D)}})}function Gm(l,p){pt(l>>>=0,{Ub:!0,name:p=nt(p>>>0),Db:0,fromWireType:()=>{},toWireType:()=>{}})}function jm(l){ji(l>>>0,!s,1,!a,131072,!1),us()}var Ui=l=>{if(!ue)try{if(l(),!(0<bt))try{o?Ki(C):Ri(C)}catch(p){p instanceof zi||p=="unwind"||m(0,p)}}catch(p){p instanceof zi||p=="unwind"||m(0,p)}};function Wi(l){l>>>=0,typeof Atomics.kc=="function"&&(Atomics.kc(O(),l>>>2,l).value.then(Rr),l+=128,Atomics.store(O(),l>>>2,1))}var Rr=()=>{var l=qr();l&&(Wi(l),Ui(oo))};function Km(l,p){(l>>>=0)==p>>>0?setTimeout(Rr):o?postMessage({Hb:l,Cb:"checkMailbox"}):(l=zt[l])&&l.postMessage({Cb:"checkMailbox"})}var qi=[];function Ym(l,p,y,w,$){for(p>>>=0,w/=2,qi.length=w,y=$>>>0>>>3,$=0;$<w;$++)qi[$]=L[y+2*$]?L[y+2*$+1]:Fe()[y+2*$+1>>>0];return(p?Ai[p]:qg[l])(...qi)}var Xm=()=>{bt=0};function Zm(l){l>>>=0,o?postMessage({Cb:"cleanupThread",ic:l}):os(zt[l])}function Qm(l){}var Br=(l,p)=>{var y=Ni[l];if(y===void 0)throw l=to(l),y=nt(l),st(l),new vt(`${p} has unknown type ${y}`);return y},Os=(l,p,y)=>{var w=[];return l=l.toWireType(w,y),w.length&&(ne()[p>>>2>>>0]=He(w)),l};function Jm(l,p,y){return p>>>=0,y>>>=0,l=Me(l>>>0),p=Br(p,"emval::as"),Os(p,y,l)}function eg(l,p){return p>>>=0,l=Me(l>>>0),(p=Br(p,"emval::as")).toWireType(null,l)}var Nr=l=>{try{l()}catch(p){_t(p)}},xt=0,at=null,Ms=0,Dr=[],Rs={},Bs={},tg=0,Fi=null,rg=[];function Ns(l){return(function(p){if(!ue){if(xt===0){var y=!1,w=!1;p(($=0)=>{if(!ue&&(Ms=$,y=!0,w)){xt=2,Nr(()=>fo(at)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),$=!1;try{var I=(function(){var W=O()[at+8>>>2>>>0];return W=Z[Bs[W]],--bt,W()})()}catch(W){I=W,$=!0}var M=!1;if(!at){var D=Fi;D&&(Fi=null,($?D.reject:D.resolve)(I),M=!0)}if($&&!M)throw I}}),w=!0,y||(xt=1,at=(function(){var $=Fr(65548),I=$+12;ne()[$>>>2>>>0]=I,ne()[$+4>>>2>>>0]=I+65536,I=Dr[0];var M=Rs[I];return M===void 0&&(M=tg++,Rs[I]=M,Bs[M]=I),I=M,O()[$+8>>>2>>>0]=I,$})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),Nr(()=>po(at)))}else xt===2?(xt=0,Nr(ho),st(at),at=null,rg.forEach(Ui)):_t(`invalid state: ${xt}`);return Ms}})(p=>{l().then(p)})}function ig(l){return l>>>=0,Ns(async()=>{var p=await Me(l);return He(p)})}var Pr=[];function ng(l,p,y,w){return y>>>=0,w>>>=0,(l=Pr[l>>>0])(null,p=Me(p>>>0),y,w)}var ag={},Lr=l=>{var p=ag[l];return p===void 0?nt(l):p};function sg(l,p,y,w,$){return y>>>=0,w>>>=0,$>>>=0,(l=Pr[l>>>0])(p=Me(p>>>0),p[y=Lr(y)],w,$)}function og(l,p){return p>>>=0,(l=Me(l>>>0))==Me(p)}var Ds=()=>typeof globalThis=="object"?globalThis:Function("return this")();function ug(l){return(l>>>=0)==0?He(Ds()):(l=Lr(l),He(Ds()[l]))}var lg=l=>{var p=Pr.length;return Pr.push(l),p},dg=(l,p)=>{for(var y=Array(l),w=0;w<l;++w)y[w]=Br(ne()[p+4*w>>>2>>>0],"parameter "+w);return y},Ps=(l,p)=>Object.defineProperty(p,"name",{value:l});function pg(l,p,y){var w=(p=dg(l,p>>>0)).shift();l--;var $=`return function (obj, func, destructorsRef, args) {
`,I=0,M=[];y===0&&M.push("obj");for(var D=["retType"],W=[w],K=0;K<l;++K)M.push("arg"+K),D.push("argType"+K),W.push(p[K]),$+=`  var arg${K} = argType${K}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[K].Db;return $+=`  var rv = ${y===1?"new func":"func.call"}(${M.join(", ")});
`,w.Ub||(D.push("emval_returnValue"),W.push(Os),$+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push($+`};
`),l=(function(oe){var pe=Function;if(!(pe instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof pe} which is not a function`);var me=Ps(pe.name||"unknownFunctionName",function(){});return me.prototype=pe.prototype,me=new me,(oe=pe.apply(me,oe))instanceof Object?oe:me})(D)(...W),y=`methodCaller<(${p.map(oe=>oe.name).join(", ")}) => ${w.name}>`,lg(Ps(y,l))}function cg(l){return l=Lr(l>>>0),He(i[l])}function fg(l,p){return p>>>=0,l=Me(l>>>0),p=Me(p),He(l[p])}function hg(l){9<(l>>>=0)&&(ct[l+1]+=1)}function mg(){return He([])}function gg(l){l=Me(l>>>0);for(var p=Array(l.length),y=0;y<l.length;y++)p[y]=l[y];return He(p)}function yg(l){return He(Lr(l>>>0))}function _g(){return He({})}function bg(l){for(var p=Me(l>>>=0);p.length;){var y=p.pop();p.pop()(y)}Pi(l)}function wg(l,p,y){p>>>=0,y>>>=0,l=Me(l>>>0),p=Me(p),y=Me(y),l[p]=y}function vg(l,p){return p>>>=0,l=(l=Br(l>>>0,"_emval_take_value")).readValueFromPointer(p),He(l)}function $g(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),O()[p>>>2>>>0]=l.getUTCSeconds(),O()[p+4>>>2>>>0]=l.getUTCMinutes(),O()[p+8>>>2>>>0]=l.getUTCHours(),O()[p+12>>>2>>>0]=l.getUTCDate(),O()[p+16>>>2>>>0]=l.getUTCMonth(),O()[p+20>>>2>>>0]=l.getUTCFullYear()-1900,O()[p+24>>>2>>>0]=l.getUTCDay(),l=(l.getTime()-Date.UTC(l.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,O()[p+28>>>2>>>0]=l}var Ls=l=>l%4==0&&(l%100!=0||l%400==0),Us=[0,31,60,91,121,152,182,213,244,274,305,335],Ws=[0,31,59,90,120,151,181,212,243,273,304,334];function xg(l,p){l=-9007199254740992>l||9007199254740992<l?NaN:Number(l),p>>>=0,l=new Date(1e3*l),O()[p>>>2>>>0]=l.getSeconds(),O()[p+4>>>2>>>0]=l.getMinutes(),O()[p+8>>>2>>>0]=l.getHours(),O()[p+12>>>2>>>0]=l.getDate(),O()[p+16>>>2>>>0]=l.getMonth(),O()[p+20>>>2>>>0]=l.getFullYear()-1900,O()[p+24>>>2>>>0]=l.getDay();var y=(Ls(l.getFullYear())?Us:Ws)[l.getMonth()]+l.getDate()-1|0;O()[p+28>>>2>>>0]=y,O()[p+36>>>2>>>0]=-60*l.getTimezoneOffset(),y=new Date(l.getFullYear(),6,1).getTimezoneOffset();var w=new Date(l.getFullYear(),0,1).getTimezoneOffset();l=0|(y!=w&&l.getTimezoneOffset()==Math.min(w,y)),O()[p+32>>>2>>>0]=l}function kg(l){l>>>=0;var p=new Date(O()[l+20>>>2>>>0]+1900,O()[l+16>>>2>>>0],O()[l+12>>>2>>>0],O()[l+8>>>2>>>0],O()[l+4>>>2>>>0],O()[l>>>2>>>0],0),y=O()[l+32>>>2>>>0],w=p.getTimezoneOffset(),$=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),M=Math.min(I,$);return 0>y?O()[l+32>>>2>>>0]=+($!=I&&M==w):0<y!=(M==w)&&($=Math.max(I,$),p.setTime(p.getTime()+6e4*((0<y?M:$)-w))),O()[l+24>>>2>>>0]=p.getDay(),y=(Ls(p.getFullYear())?Us:Ws)[p.getMonth()]+p.getDate()-1|0,O()[l+28>>>2>>>0]=y,O()[l>>>2>>>0]=p.getSeconds(),O()[l+4>>>2>>>0]=p.getMinutes(),O()[l+8>>>2>>>0]=p.getHours(),O()[l+12>>>2>>>0]=p.getDate(),O()[l+16>>>2>>>0]=p.getMonth(),O()[l+20>>>2>>>0]=p.getYear(),l=p.getTime(),BigInt(isNaN(l)?-1:l/1e3)}function qs(l,p,y,w,$,I,M){return o?_e(16,1,l,p,y,w,$,I,M):-52}function Fs(l,p,y,w,$,I){if(o)return _e(17,1,l,p,y,w,$,I)}var lr={},Sg=()=>performance.timeOrigin+performance.now();function Hs(l,p){if(o)return _e(18,1,l,p);if(lr[l]&&(clearTimeout(lr[l].id),delete lr[l]),!p)return 0;var y=setTimeout(()=>{delete lr[l],Ui(()=>so(l,performance.timeOrigin+performance.now()))},p);return lr[l]={id:y,rc:p},0}function Tg(l,p,y,w){l>>>=0,p>>>=0,y>>>=0,w>>>=0;var $=new Date().getFullYear(),I=new Date($,0,1).getTimezoneOffset();$=new Date($,6,1).getTimezoneOffset();var M=Math.max(I,$);ne()[l>>>2>>>0]=60*M,O()[p>>>2>>>0]=+(I!=$),l=(p=D=>{var W=Math.abs(D);return`UTC${0<=D?"-":"+"}${String(Math.floor(W/60)).padStart(2,"0")}${String(W%60).padStart(2,"0")}`})(I),p=p($),$<I?(jt(l,y,17),jt(p,w,17)):(jt(l,w,17),jt(p,y,17))}var Ig=()=>Date.now(),Cg=1;function Eg(l,p,y){if(!(0<=l&&3>=l))return 28;if(l===0)l=Date.now();else{if(!Cg)return 52;l=performance.timeOrigin+performance.now()}return L[y>>>0>>>3]=BigInt(Math.round(1e6*l)),0}var Hi=[],Vs=(l,p)=>{Hi.length=0;for(var y;y=B()[l++>>>0];){var w=y!=105;p+=(w&=y!=112)&&p%8?4:0,Hi.push(y==112?ne()[p>>>2>>>0]:y==106?L[p>>>3]:y==105?O()[p>>>2>>>0]:Fe()[p>>>3>>>0]),p+=w?8:4}return Hi};function Ag(l,p,y){return l>>>=0,p=Vs(p>>>0,y>>>0),Ai[l](...p)}function zg(l,p,y){return l>>>=0,p=Vs(p>>>0,y>>>0),Ai[l](...p)}var Og=()=>{};function Mg(l,p){return S($e(l>>>0,p>>>0))}var Rg=()=>{throw bt+=1,"unwind"};function Bg(){return 4294901760}var Ng=()=>navigator.hardwareConcurrency;function Dg(){return _t("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function Pg(l){l>>>=0;var p=B().length;if(l<=p||4294901760<l)return!1;for(var y=1;4>=y;y*=2){var w=p*(1+.2/y);w=Math.min(w,l+100663296);e:{w=(Math.min(4294901760,65536*Math.ceil(Math.max(l,w)/65536))-k.buffer.byteLength+65535)/65536|0;try{k.grow(w),Be();var $=1;break e}catch{}$=void 0}if($)return!0}return!1}var Ur=()=>(_t("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Kt={},Gs=l=>{l.forEach(p=>{var y=Ur();y&&(Kt[y]=p)})};function Lg(){var l=Error().stack.toString().split(`
`);return l[0]=="Error"&&l.shift(),Gs(l),Kt.Mb=Ur(),Kt.dc=l,Kt.Mb}function Ug(l,p,y){if(l>>>=0,p>>>=0,Kt.Mb==l)var w=Kt.dc;else(w=Error().stack.toString().split(`
`))[0]=="Error"&&w.shift(),Gs(w);for(var $=3;w[$]&&Ur()!=l;)++$;for(l=0;l<y&&w[l+$];++l)O()[p+4*l>>>2>>>0]=Ur();return l}var Vi,Gi={},js=()=>{if(!Vi){var l,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(l in Gi)Gi[l]===void 0?delete p[l]:p[l]=Gi[l];var y=[];for(l in p)y.push(`${l}=${p[l]}`);Vi=y}return Vi};function Ks(l,p){if(o)return _e(19,1,l,p);l>>>=0,p>>>=0;var y=0;return js().forEach((w,$)=>{var I=p+y;for($=ne()[l+4*$>>>2>>>0]=I,I=0;I<w.length;++I)le()[$++>>>0]=w.charCodeAt(I);le()[$>>>0]=0,y+=w.length+1}),0}function Ys(l,p){if(o)return _e(20,1,l,p);l>>>=0,p>>>=0;var y=js();ne()[l>>>2>>>0]=y.length;var w=0;return y.forEach($=>w+=$.length+1),ne()[p>>>2>>>0]=w,0}function Xs(l){return o?_e(21,1,l):52}function Zs(l,p,y,w){return o?_e(22,1,l,p,y,w):52}function Qs(l,p,y,w){return o?_e(23,1,l,p,y,w):70}var Wg=[null,[],[]];function Js(l,p,y,w){if(o)return _e(24,1,l,p,y,w);p>>>=0,y>>>=0,w>>>=0;for(var $=0,I=0;I<y;I++){var M=ne()[p>>>2>>>0],D=ne()[p+4>>>2>>>0];p+=8;for(var W=0;W<D;W++){var K=B()[M+W>>>0],oe=Wg[l];K===0||K===10?((l===1?b:S)(hs(oe)),oe.length=0):oe.push(K)}$+=D}return ne()[w>>>2>>>0]=$,0}o||(function(){for(var l=i.numThreads-1;l--;)ds();Oi.unshift(()=>{sr++,(function(p){o?p():Promise.all(wt.map(ls)).then(p)})(()=>ts())})})();for(var eo=Array(256),Wr=0;256>Wr;++Wr)eo[Wr]=String.fromCharCode(Wr);Es=eo,vt=i.BindingError=class extends Error{constructor(l){super(l),this.name="BindingError"}},i.InternalError=class extends Error{constructor(l){super(l),this.name="InternalError"}},ct.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>ct.length/2-5-Di.length;var Z,qg=[Mi,as,ps,ms,gs,_s,bs,ws,vs,$s,xs,ks,Ss,Ts,Is,Cs,qs,Fs,Hs,Ks,Ys,Xs,Zs,Qs,Js];(async function(){function l(w,$){return Z=w.exports,Z=(function(){var I=Z,M={};for(let[D,W]of Object.entries(I))M[D]=typeof W=="function"?(...K)=>{Dr.push(D);try{return W(...K)}finally{ue||(Dr.pop(),at&&xt===1&&Dr.length===0&&(xt=0,bt+=1,Nr(co),typeof Fibers<"u"&&Fibers.sc()))}}:W;return M})(),Z=(function(){var I=Z,M=W=>K=>W(K)>>>0,D=W=>()=>W()>>>0;return(I=Object.assign({},I)).Ea=M(I.Ea),I.gb=D(I.gb),I.ib=M(I.ib),I.ub=M(I.ub),I.vb=D(I.vb),I.__cxa_get_exception_ptr=M(I.__cxa_get_exception_ptr),I})(),ss.push(Z.jb),T=$,ts(),Z}sr++;var p=rs();if(i.instantiateWasm)return new Promise(w=>{i.instantiateWasm(p,($,I)=>{l($,I),w($.exports)})});if(o)return new Promise(w=>{be=$=>{var I=new WebAssembly.Instance($,rs());w(l(I,$))}});Ei??(Ei=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",_):_+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",Je.url).href);try{var y=await(async function(w){var $=Ei;if(!F&&typeof WebAssembly.instantiateStreaming=="function"&&!j($))try{var I=fetch($,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,w)}catch(M){S(`wasm streaming compile failed: ${M}`),S("falling back to ArrayBuffer instantiation")}return(async function(M,D){try{var W=await(async function(K){if(!F)try{var oe=await f(K);return new Uint8Array(oe)}catch{}if(K==Ei&&F)K=new Uint8Array(F);else{if(!h)throw"both async and sync fetching of the wasm failed";K=h(K)}return K})(M);return await WebAssembly.instantiate(W,D)}catch(K){S(`failed to asynchronously prepare wasm: ${K}`),_t(K)}})($,w)})(p);return l(y.instance,y.module)}catch(w){return r(w),Promise.reject(w)}})();var to=l=>(to=Z.Ea)(l),ro=()=>(ro=Z.Fa)();i._OrtInit=(l,p)=>(i._OrtInit=Z.Ga)(l,p),i._OrtGetLastError=(l,p)=>(i._OrtGetLastError=Z.Ha)(l,p),i._OrtCreateSessionOptions=(l,p,y,w,$,I,M,D,W,K)=>(i._OrtCreateSessionOptions=Z.Ia)(l,p,y,w,$,I,M,D,W,K),i._OrtAppendExecutionProvider=(l,p,y,w,$)=>(i._OrtAppendExecutionProvider=Z.Ja)(l,p,y,w,$),i._OrtAddFreeDimensionOverride=(l,p,y)=>(i._OrtAddFreeDimensionOverride=Z.Ka)(l,p,y),i._OrtAddSessionConfigEntry=(l,p,y)=>(i._OrtAddSessionConfigEntry=Z.La)(l,p,y),i._OrtReleaseSessionOptions=l=>(i._OrtReleaseSessionOptions=Z.Ma)(l),i._OrtCreateSession=(l,p,y)=>(i._OrtCreateSession=Z.Na)(l,p,y),i._OrtReleaseSession=l=>(i._OrtReleaseSession=Z.Oa)(l),i._OrtGetInputOutputCount=(l,p,y)=>(i._OrtGetInputOutputCount=Z.Pa)(l,p,y),i._OrtGetInputOutputMetadata=(l,p,y,w)=>(i._OrtGetInputOutputMetadata=Z.Qa)(l,p,y,w),i._OrtFree=l=>(i._OrtFree=Z.Ra)(l),i._OrtCreateTensor=(l,p,y,w,$,I)=>(i._OrtCreateTensor=Z.Sa)(l,p,y,w,$,I),i._OrtGetTensorData=(l,p,y,w,$)=>(i._OrtGetTensorData=Z.Ta)(l,p,y,w,$),i._OrtReleaseTensor=l=>(i._OrtReleaseTensor=Z.Ua)(l),i._OrtCreateRunOptions=(l,p,y,w)=>(i._OrtCreateRunOptions=Z.Va)(l,p,y,w),i._OrtAddRunConfigEntry=(l,p,y)=>(i._OrtAddRunConfigEntry=Z.Wa)(l,p,y),i._OrtReleaseRunOptions=l=>(i._OrtReleaseRunOptions=Z.Xa)(l),i._OrtCreateBinding=l=>(i._OrtCreateBinding=Z.Ya)(l),i._OrtBindInput=(l,p,y)=>(i._OrtBindInput=Z.Za)(l,p,y),i._OrtBindOutput=(l,p,y,w)=>(i._OrtBindOutput=Z._a)(l,p,y,w),i._OrtClearBoundOutputs=l=>(i._OrtClearBoundOutputs=Z.$a)(l),i._OrtReleaseBinding=l=>(i._OrtReleaseBinding=Z.ab)(l),i._OrtRunWithBinding=(l,p,y,w,$)=>(i._OrtRunWithBinding=Z.bb)(l,p,y,w,$),i._OrtRun=(l,p,y,w,$,I,M,D)=>(i._OrtRun=Z.cb)(l,p,y,w,$,I,M,D),i._OrtEndProfiling=l=>(i._OrtEndProfiling=Z.db)(l),i._JsepOutput=(l,p,y)=>(i._JsepOutput=Z.eb)(l,p,y),i._JsepGetNodeName=l=>(i._JsepGetNodeName=Z.fb)(l);var qr=()=>(qr=Z.gb)(),st=i._free=l=>(st=i._free=Z.hb)(l),Fr=i._malloc=l=>(Fr=i._malloc=Z.ib)(l),ji=(l,p,y,w,$,I)=>(ji=Z.lb)(l,p,y,w,$,I),io=()=>(io=Z.mb)(),no=(l,p,y,w,$)=>(no=Z.nb)(l,p,y,w,$),ao=l=>(ao=Z.ob)(l),Ki=l=>(Ki=Z.pb)(l),so=(l,p)=>(so=Z.qb)(l,p),oo=()=>(oo=Z.rb)(),uo=(l,p)=>(uo=Z.sb)(l,p),Hr=l=>(Hr=Z.tb)(l),Yi=l=>(Yi=Z.ub)(l),Xi=()=>(Xi=Z.vb)(),lo=i.dynCall_ii=(l,p)=>(lo=i.dynCall_ii=Z.wb)(l,p),po=l=>(po=Z.xb)(l),co=()=>(co=Z.yb)(),fo=l=>(fo=Z.zb)(l),ho=()=>(ho=Z.Ab)();return i.stackSave=()=>Xi(),i.stackRestore=l=>Hr(l),i.stackAlloc=l=>Yi(l),i.setValue=function(l,p,y="i8"){switch(y.endsWith("*")&&(y="*"),y){case"i1":case"i8":le()[l>>>0]=p;break;case"i16":U()[l>>>1>>>0]=p;break;case"i32":O()[l>>>2>>>0]=p;break;case"i64":L[l>>>3]=BigInt(p);break;case"float":Oe()[l>>>2>>>0]=p;break;case"double":Fe()[l>>>3>>>0]=p;break;case"*":ne()[l>>>2>>>0]=p;break;default:_t(`invalid type for setValue: ${y}`)}},i.getValue=function(l,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return le()[l>>>0];case"i16":return U()[l>>>1>>>0];case"i32":return O()[l>>>2>>>0];case"i64":return L[l>>>3];case"float":return Oe()[l>>>2>>>0];case"double":return Fe()[l>>>3>>>0];case"*":return ne()[l>>>2>>>0];default:_t(`invalid type for getValue: ${p}`)}},i.UTF8ToString=$e,i.stringToUTF8=jt,i.lengthBytesUTF8=ys,(function l(){if(0<sr)or=l;else if(o)t(i),Mr();else{for(;0<Oi.length;)Oi.shift()(i);0<sr?or=l:(i.calledRun=!0,ue||(Mr(),t(i)))}})(),i.PTR_SIZE=4,n}),mp=nn,yo=globalThis.self?.name?.startsWith("em-pthread"),yo&&nn()}),an,Qn,_o,Ue,gp,Gr,bo,wo,sn,vo,on,yp,un,_p,ya=P(()=>{"use strict";ga(),an=typeof location>"u"?void 0:location.origin,Qn=Je.url>"file:"&&Je.url<"file;",_o=()=>{if(Qn){let e=URL;return new URL(new e("ort.bundle.min.mjs",Je.url).href,an).href}return Je.url},Ue=_o(),gp=()=>{if(Ue&&!Ue.startsWith("blob:"))return Ue.substring(0,Ue.lastIndexOf("/")+1)},Gr=(e,t)=>{try{let r=t??Ue;return(r?new URL(e,r):new URL(e)).origin===an}catch{return!1}},bo=(e,t)=>{let r=t??Ue;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},wo=(e,t)=>`${t??"./"}${e}`,sn=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},vo=async e=>(await import(e)).default,on=(p0(),Tr(cp)).default,yp=async()=>{if(!Ue)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(Gr(Ue))return[void 0,on()];let e=await sn(Ue);return[e,on(e)]},un=(c0(),Tr(hp)).default,_p=async(e,t,r)=>{if(!e&&!t&&un&&Ue&&Gr(Ue))return[void 0,un];{let i="ort-wasm-simd-threaded.jsep.mjs",n=e??bo(i,t),a=r&&n&&!Gr(n,t),s=a?await sn(n):n??wo(i,t);return[a?s:void 0,await vo(s)]}}}),ln,jr,pr,dn,$o,xo,ko,_a,ge,Ft=P(()=>{"use strict";ya(),jr=!1,pr=!1,dn=!1,$o=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},xo=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},ko=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},_a=async e=>{if(jr)return Promise.resolve();if(pr)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(dn)throw new Error("previous call to 'initializeWebAssembly()' failed.");pr=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!ko())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!xo())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=$o();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let n=e.wasmPaths,a=typeof n=="string"?n:void 0,s=n?.mjs,o=s?.href??s,u=n?.wasm,d=u?.href??u,c=e.wasmBinary,[f,h]=await _p(o,a,r>1),g=!1,m=[];if(t>0&&m.push(new Promise(_=>{setTimeout(()=>{g=!0,_()},t)})),m.push(new Promise((_,x)=>{let v={numThreads:r};if(c)v.wasmBinary=c;else if(d||a)v.locateFile=b=>d??a+b;else if(o&&o.indexOf("blob:")!==0)v.locateFile=b=>new URL(b,o).href;else if(f){let b=gp();b&&(v.locateFile=S=>b+S)}h(v).then(b=>{pr=!1,jr=!0,ln=b,_(),f&&URL.revokeObjectURL(f)},b=>{pr=!1,dn=!0,x(b)})})),await Promise.race(m),g)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ge=()=>{if(jr&&ln)return ln;throw new Error("WebAssembly is not initialized yet.")}}),Qe,oi,he,ba=P(()=>{"use strict";Ft(),Qe=(e,t)=>{let r=ge(),i=r.lengthBytesUTF8(e)+1,n=r._malloc(i);return r.stringToUTF8(e,n,i),t.push(n),n},oi=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([n,a])=>{let s=t?t+n:n;if(typeof a=="object")oi(a,s+".",r,i);else if(typeof a=="string"||typeof a=="number")i(s,a.toString());else if(typeof a=="boolean")i(s,a?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof a}`)})},he=e=>{let t=ge(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetLastError(n,n+i);let a=Number(t.getValue(n,i===4?"i32":"i64")),s=t.getValue(n+i,"*"),o=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${a}, ERROR_MESSAGE: ${o}`)}finally{t.stackRestore(r)}}}),bp,f0=P(()=>{"use strict";Ft(),ba(),bp=e=>{let t=ge(),r=0,i=[],n=e||{};try{if(e?.logSeverityLevel===void 0)n.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)n.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(n.terminate=!1);let a=0;return e?.tag!==void 0&&(a=Qe(e.tag,i)),r=t._OrtCreateRunOptions(n.logSeverityLevel,n.logVerbosityLevel,!!n.terminate,a),r===0&&he("Can't create run options."),e?.extra!==void 0&&oi(e.extra,"",new WeakSet,(s,o)=>{let u=Qe(s,i),d=Qe(o,i);t._OrtAddRunConfigEntry(r,u,d)!==0&&he(`Can't set a run config entry: ${s} - ${o}.`)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),a}}}),So,To,Io,cr,Co,wp,h0=P(()=>{"use strict";Ft(),ba(),So=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},To=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Io=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},cr=(e,t,r,i)=>{let n=Qe(t,i),a=Qe(r,i);ge()._OrtAddSessionConfigEntry(e,n,a)!==0&&he(`Can't set a session config entry: ${t} - ${r}.`)},Co=async(e,t,r)=>{for(let i of t){let n=typeof i=="string"?i:i.name,a=[];switch(n){case"webnn":if(n="WEBNN",typeof i!="string"){let c=i?.deviceType;c&&cr(e,"deviceType",c,r)}break;case"webgpu":if(n="JS",typeof i!="string"){let c=i;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);cr(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${n}`)}let s=Qe(n,r),o=a.length,u=0,d=0;if(o>0){u=ge()._malloc(o*ge().PTR_SIZE),r.push(u),d=ge()._malloc(o*ge().PTR_SIZE),r.push(d);for(let c=0;c<o;c++)ge().setValue(u+c*ge().PTR_SIZE,a[c][0],"*"),ge().setValue(d+c*ge().PTR_SIZE,a[c][1],"*")}await ge()._OrtAppendExecutionProvider(e,s,u,d,o)!==0&&he(`Can't append execution provider: ${n}.`)}},wp=async e=>{let t=ge(),r=0,i=[],n=e||{};Io(n);try{let a=So(n.graphOptimizationLevel??"all"),s=To(n.executionMode??"sequential"),o=typeof n.logId=="string"?Qe(n.logId,i):0,u=n.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw new Error(`log serverity level is not valid: ${u}`);let d=n.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof n.optimizedModelFilePath=="string"?Qe(n.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(a,!!n.enableCpuMemArena,!!n.enableMemPattern,s,!!n.enableProfiling,0,o,u,d,c),r===0&&he("Can't create session options."),n.executionProviders&&await Co(r,n.executionProviders,i),n.enableGraphCapture!==void 0){if(typeof n.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${n.enableGraphCapture}`);cr(r,"enableGraphCapture",n.enableGraphCapture.toString(),i)}if(n.freeDimensionOverrides)for(let[f,h]of Object.entries(n.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof h!="number"||!Number.isInteger(h)||h<0)throw new Error(`free dimension override value must be a non-negative integer: ${h}`);let g=Qe(f,i);t._OrtAddFreeDimensionOverride(r,g,h)!==0&&he(`Can't set a free dimension override: ${f} - ${h}.`)}return n.extra!==void 0&&oi(n.extra,"",new WeakSet,(f,h)=>{cr(r,f,h,i)}),[r,i]}catch(a){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&he("Can't release session options."),i.forEach(s=>t._free(s)),a}}}),Pt,ht,Lt,hi,ui,wa,va,Jn,ee=P(()=>{"use strict";Pt=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ht=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Lt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((n,a)=>n*a,1);return r>0?Math.ceil(i*r):void 0},hi=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},ui=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},wa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",va=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Jn=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),$a,vp=P(()=>{"use strict";ga(),$a=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let n=t.body.getReader(),a;try{a=new ArrayBuffer(i)}catch(o){if(o instanceof RangeError){let u=Math.ceil(i/65536);a=new WebAssembly.Memory({initial:u,maximum:u}).buffer}else throw o}let s=0;for(;;){let{done:o,value:u}=await n.read();if(o)break;let d=u.byteLength;new Uint8Array(a,s,d).set(u),s+=d}return new Uint8Array(a,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Eo,Ao,zo,Oo,xa,Mo,de,mt=P(()=>{"use strict";ee(),Eo=["V","I","W","E","F"],Ao=(e,t)=>{console.log(`[${Eo[e]},${new Date().toISOString()}]${t}`)},xa=(e,t)=>{zo=e,Oo=t},Mo=(e,t)=>{let r=ui(e),i=ui(zo);r>=i&&Ao(r,typeof t=="function"?t():t)},de=(...e)=>{Oo&&Mo(...e)}}),Ro,Jt,A,li,$p,xp,kp,ae=P(()=>{"use strict";Ro=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Jt=class{static calcShape(e,t,r=!1){let i=e.length,n=t.length;if(i===0)return t;if(n===0)return e;let a=Math.max(e.length,t.length),s=new Array(a);if(r){if(i<2||n<2)return;let o=Ro.calcMatMulShape([e[i-2],e[i-1]],[t[n-2],t[n-1]]);if(o===void 0)return;[s[a-2],s[a-1]]=o}for(let o=r?3:1;o<=a;o++){let u=i-o<0?1:e[i-o],d=n-o<0?1:t[n-o];if(u!==d&&u>1&&d>1)return;let c=Math.max(u,d);if(u&&d)s[a-o]=Math.max(u,d);else{if(c>1)return;s[a-o]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let n=1;n<=r;n++)if(e[r-n]!==1&&e[r-n]!==t[i-n])return!1;return!0}},A=class ni{static size(t){return ni.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let n=new Array(i),a=i-1;for(;a>=0;){if(t[a]%r===0){n[a]=t[a]/r;break}if(r%t[a]!==0)throw new Error("cannot convert shape");n[a]=1,r/=t[a],a--}for(a--;a>=0;a--)n[a]=t[a];return n}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return ni.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let n=1;for(let a=r;a<i;a++){if(t[a]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");n*=Number(t[a])}return n}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let n=r-3;n>=0;--n)i[n]=i[n+1]*t[n+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((n,a)=>n+r[a]+r[a+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,n)=>i===r[n])}},li=class $r{static adjustPoolAttributes(t,r,i,n,a,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let o=0;o<r.length-2;o++)o>=i.length?i.push(r[o+2]):i[o]=r[o+2];for(let o=0;o<i.length;o++)if(o<n.length){if(n[o]<0)throw new Error("strides should be greater than or equal to 1")}else n.push(1);for(let o=0;o<i.length;o++)if(o<a.length){if(a[o]<0)throw new Error("dilations should be greater than or equal to 1")}else a.push(1);for(let o=0;o<i.length*2;o++)if(o<s.length){if(s[o]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let o=0;o<i.length;o++){if(i[o]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[o]>=i[o]||s[o+i.length]>=i[o])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,n,a,s,o){if(o){if(a.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(n.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let u=0;u<t.length-2;u++)$r.adjustPadAndReturnShape(t[u+(s?1:2)],r[u],i[u],n[u],a,u,u+t.length-2,o)}}static computePoolOutputShape(t,r,i,n,a,s,o){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let u=[r[0],r[1]];return $r.computeShapeHelper(t,r,u,i,n,a,s,o),u}static computeConvOutputShape(t,r,i,n,a,s,o){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let u=[t[0],r[0]];return $r.computeShapeHelper(!1,t,u,i,n,a,s,o),u}static computeShapeHelper(t,r,i,n,a,s,o,u){if(t)for(let d=0;d<r.length-2;d++)i.push(1);else for(let d=0;d<r.length-2;d++)i.push($r.adjustPadAndReturnShape(r[d+2],n[d],a[d],s[d],o,d,d+r.length-2,u))}static adjustPadAndReturnShape(t,r,i,n,a,s,o,u){let d=i*(n-1)+1;if(u&&u!=="NOTSET")switch(u){case"VALID":return a[s]=0,a[o]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+n-t;return a[s]=Math.floor(u==="SAME_LOWER"?(c+1)/2:c/2),a[o]=c-a[s],Math.floor((t+c-n)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+a[s]+a[o]-d)/r+1)}},$p=class{static getShapeOfGemmResult(e,t,r,i,n){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let a,s,o;t?(a=e[1],s=e[0]):(a=e[0],s=e[1]);let u=-1;if(i?(o=r[0],u=1):(o=r[1],u=0),r[u]!==s)throw new Error("dimension mismatch");if(a<=0||o<=0||s<=0)throw new Error("invalid shape specified");if(n&&!Jt.isValidBroadcast(n,[a,o]))throw new Error("gemm: invalid bias shape for broadcast");return[a,o,s]}},xp=-34028234663852886e22,kp=34028234663852886e22}),ka,Sp=P(()=>{"use strict";ee(),ka=(e,t)=>new(hi(t))(e)}),pn,ea,cn,Bo,fn,No,hn,mn,gn,Do,Tp,m0=P(()=>{"use strict";ee(),mt(),pn=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),ea=(e,t)=>{if(t==="int32")return e;let r=pn.get(t);if(!r)throw new Error(`WebNN backend does not support data type: ${t}`);let i=r/8;if(e.byteLength%i!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${i}.`);let n=e.byteLength/i,a=new(hi(t))(e.buffer,e.byteOffset,n);switch(t){case"int64":case"uint64":{let s=new Int32Array(n);for(let o=0;o<n;o++){let u=a[o];if(u>2147483647n||u<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[o]=Number(u)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&a.some(o=>o>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(a,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},cn=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r);switch(t){case"int64":{let n=BigInt64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"uint64":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let n=BigUint64Array.from(i,BigInt);return new Uint8Array(n.buffer)}case"int8":{if(i.some(a=>a<-128||a>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let n=Int8Array.from(i,Number);return new Uint8Array(n.buffer)}case"uint8":{if(i.some(n=>n<0||n>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(i,Number)}case"uint32":{if(i.some(a=>a<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let n=Uint32Array.from(i,Number);return new Uint8Array(n.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Bo=1,fn=()=>Bo++,No=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),hn=(e,t)=>{let r=pn.get(e);if(!r)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((i,n)=>i*n)*r/8):0},mn=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:r,tensor:i,dataType:n,shape:a,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=n,this.tensorShape=a,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return hn(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),r=cn(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(r);return}else return r.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,n)=>i===r[n])}setIsDataConverted(e){this.isDataConverted=e}},gn=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let n=this.tensorManager.getMLContext(e),a;if(!n.opSupportLimits().input.dataTypes.includes(t)){if(a=No.get(t),!a||!n.opSupportLimits().input.dataTypes.includes(a))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${a}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(n,t,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==hn(t,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,r,s,!0,!0,a),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=ea(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?cn(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Do=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=fn();return this.tensorTrackersById.set(e,new gn(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,n){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${n}}`);let a=this.tensorTrackersById.get(t);if(!a)throw new Error("Tensor not found.");return a.ensureTensor(e,r,i,n)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let n=this.getMLContext(e),a=fn(),s=new mn({sessionId:e,context:n,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(a,new gn(this,s)),this.externalTensors.add(s),a}async getCachedTensor(e,t,r,i,n,a,s){let o=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(o,t,r)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${r}}`);let u=await o.createTensor({dataType:s??t,shape:r,dimensions:r,usage:i,writable:n,readable:a});return new mn({sessionId:e,context:o,tensor:u,dataType:t,shape:r,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Tp=(...e)=>new Do(...e)}),fr,Po,Ip,g0=P(()=>{"use strict";ee(),Ft(),Sp(),m0(),mt(),fr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Po=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((n,a)=>n===i[a]&&e[n]===t[n])},Ip=class{constructor(e){this.tensorManager=Tp(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,xa(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Po(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(n=>n.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,n){let a=fr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,a,i,n)}async createTemporaryTensor(e,t,r){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=fr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let n=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,n,i,r,!1);let a=this.temporarySessionTensorIds.get(e);return a?a.push(n):this.temporarySessionTensorIds.set(e,[n]),n}uploadTensor(e,t){if(!ge().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return ka(r,t)}}registerMLTensor(e,t,r,i){let n=fr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);let a=this.tensorManager.registerTensor(e,t,n,i);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${n}, dimensions: ${i}} -> {tensorId: ${a}}`),a}registerMLConstant(e,t,r,i,n,a,s=!1){if(!a)throw new Error("External mounted files are not available.");let o=e;e.startsWith("./")&&(o=e.substring(2));let u=a.get(o);if(!u)throw new Error(`File with name ${o} not found in preloaded files.`);if(t+r>u.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=u.slice(t,t+r).buffer,c;switch(n.dataType){case"float32":c=new Float32Array(d);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":c=new Int32Array(d);break;case"uint32":c=new Uint32Array(d);break;case"int64":if(s){let f=ea(new Uint8Array(d),"int64");c=new Int32Array(f.buffer),n.dataType="int32"}else c=new BigInt64Array(d);break;case"uint64":c=new BigUint64Array(d);break;case"int8":c=new Int8Array(d);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${n.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${n.dataType}, shape: ${n.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(n,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isGraphOutput(e,t){let r=this.sessionGraphOutputs.get(e);return r?r.includes(t):!1}isGraphInputOutputTypeSupported(e,t,r=!0){let i=this.mlContextBySessionId.get(e),n=fr.get(Pt(t));return typeof n>"u"?!1:r?!!i?.opSupportLimits().input.dataTypes.includes(n):!!i?.opSupportLimits().output.dataTypes.includes(n)}flush(){}}}),Sa=P(()=>{"use strict"}),yn,Kr,Yr,Lo,Uo,_n,ta,Wo,Cp,y0=P(()=>{"use strict";mt(),Sa(),yn=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Kr=[],Yr=e=>Math.ceil(Number(e)/16)*16,Lo=e=>{for(let t=0;t<Kr.length;t++){let r=Kr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Uo=1,_n=()=>Uo++,ta=async(e,t,r,i)=>{let n=Yr(r),a=e.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,a,0,n),e.flush(),await a.mapAsync(GPUMapMode.READ);let o=a.getMappedRange();if(i){let u=i();return u.set(new Uint8Array(o,0,r)),u}else return new Uint8Array(o.slice(0,r))}finally{a.destroy()}},Wo=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of yn)Kr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,n=t.byteLength,a=Yr(n),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==n)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${n}`);let o=this.backend.device.createBuffer({mappedAtCreation:!0,size:a,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),u=o.getMappedRange();new Uint8Array(u).set(new Uint8Array(r,i,n)),o.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(o,0,s.gpuData.buffer,0,a),this.backend.device.queue.submit([d.finish()]),o.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let n=Yr(r.originalSize),a=this.backend.getCommandEncoder();this.backend.endComputePass(),a.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,n)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=_n();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Lo(e),i,n=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,a=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(n||a){let o=(n?this.freeBuffers:this.freeUniformBuffers).get(r);o?o.length>0?i=o.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:_n(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await ta(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=yn.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Cp=(...e)=>new Wo(...e)}),qo,fe,ve=P(()=>{"use strict";qo=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},fe=e=>new qo(e)}),er,Xr,Se,Ee,Y,we,ra,Qt,It,G,hr,R,H,Ep,Ta,Fo,Ap,se=P(()=>{"use strict";ee(),ae(),er=64,Xr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Se=(e,t=1)=>{let r=Xr(e,t);return typeof r=="string"?r:r[0]},Ee=(e,t=1)=>{let r=Xr(e,t);return typeof r=="string"?r:r[1]},Y=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:A.computeStrides(r)})}),t},we=e=>e%4===0?4:e%2===0?2:1,ra=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Qt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,It=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,G=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,hr=(e,t,r,i,n)=>{let a=typeof r=="number",s=a?r:r.length,o=[...new Array(s).keys()],u=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Xr(t,n),c=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],h={indices:u,value:c,storage:f,tensor:t},g=B=>typeof B=="string"?B:`${B}u`,m={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},_=a?"uniforms.":"",x=`${_}${e}_shape`,v=`${_}${e}_strides`,b="";for(let B=0;B<s-1;B++)b+=`
    let dim${B} = current / ${G(v,B,s)};
    let rest${B} = current % ${G(v,B,s)};
    indices[${B}] = dim${B};
    current = rest${B};
    `;b+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${h.indices} {
    var indices: ${h.indices};
    var current = offset;
    ${b}
    return indices;
  }`,k=B=>(m.offsetToIndices=!0,s<2?B:`o2i_${e}(${B})`),T=[];if(s>=2)for(let B=s-1;B>=0;B--)T.push(`${G(v,B,s)} * (indices[${B}])`);let C=s<2?"":`
  fn i2o_${e}(indices: ${h.indices}) -> u32 {
    return ${T.join("+")};
  }`,E=B=>(m.indicesToOffset=!0,s<2?B:`i2o_${e}(${B})`),z=(...B)=>s===0?"0u":`${h.indices}(${B.map(g).join(",")})`,N=(B,U)=>s<2?`${B}`:`${G(B,U,s)}`,q=(B,U,re)=>s<2?`${B}=${re};`:`${G(B,U,s)}=${re};`,Q={},V=(B,U)=>{m.broadcastedIndicesToOffset=!0;let re=`${U.name}broadcastedIndicesTo${e}Offset`;if(re in Q)return`${re}(${B})`;let O=[];for(let ne=s-1;ne>=0;ne--){let Oe=U.indicesGet("outputIndices",ne+U.rank-s);O.push(`${N(v,ne)} * (${Oe} % ${N(x,ne)})`)}return Q[re]=`fn ${re}(outputIndices: ${U.type.indices}) -> u32 {
             return ${O.length>0?O.join("+"):"0u"};
           }`,`${re}(${B})`},te=(B,U)=>(()=>{if(h.storage===h.value)return`${e}[${B}]=${U};`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`${e}[${B}]=vec2<u32>(u32(${U}), select(0u, 0xFFFFFFFFu, ${U} < 0));`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`${e}[${B}]=vec2<u32>(u32(${U}), 0u);`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`${e}[${B}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${U}));`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),L=B=>(()=>{if(h.storage===h.value)return`${e}[${B}]`;if(h.storage==="vec2<u32>"&&h.value==="i32")return`i32(${e}[${B}].x)`;if(h.storage==="vec2<u32>"&&h.value==="u32")return`u32(${e}[${B}].x)`;if(h.storage==="u32"&&h.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${B}] & 0xFFu), bool(${e}[${B}] & 0xFF00u), bool(${e}[${B}] & 0xFF0000u), bool(${e}[${B}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${h.storage} and value type ${h.value} yet`)})(),ie=s<2?"":`
  fn get_${e}ByIndices(indices: ${h.indices}) -> ${c} {
    return ${L(`i2o_${e}(indices)`)};
  }`,X=s<2?"":(()=>{let B=o.map(re=>`d${re}: u32`).join(", "),U=o.map(re=>`d${re}`).join(", ");return`
  fn get_${e}(${B}) -> ${c} {
    return get_${e}ByIndices(${z(U)});
  }`})(),F=(...B)=>{if(B.length!==s)throw new Error(`indices length must be ${s}`);let U=B.map(g).join(",");return s===0?L("0u"):s===1?L(U[0]):(m.get=!0,m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}(${U})`)},ue=B=>s<2?L(B):(m.getByIndices=!0,m.indicesToOffset=!0,`get_${e}ByIndices(${B})`),j=s<2?"":`
  fn set_${e}ByIndices(indices: ${h.indices}, value: ${c}) {
    ${te(`i2o_${e}(indices)`,"value")}
  }`,le=s<2?"":(()=>{let B=o.map(re=>`d${re}: u32`).join(", "),U=o.map(re=>`d${re}`).join(", ");return`
  fn set_${e}(${B}, value: ${c}) {
    set_${e}ByIndices(${z(U)}, value);
  }`})();return{impl:()=>{let B=[],U=!1;return m.offsetToIndices&&(B.push(S),U=!0),m.indicesToOffset&&(B.push(C),U=!0),m.broadcastedIndicesToOffset&&(Object.values(Q).forEach(re=>B.push(re)),U=!0),m.set&&(B.push(le),U=!0),m.setByIndices&&(B.push(j),U=!0),m.get&&(B.push(X),U=!0),m.getByIndices&&(B.push(ie),U=!0),!a&&U&&B.unshift(`const ${x} = ${h.indices}(${r.join(",")});`,`const ${v} = ${h.indices}(${A.computeStrides(r).join(",")});`),B.join(`
`)},type:h,offsetToIndices:k,indicesToOffset:E,broadcastedIndicesToOffset:V,indices:z,indicesGet:N,indicesSet:q,set:(...B)=>{if(B.length!==s+1)throw new Error(`indices length must be ${s}`);let U=B[s];if(typeof U!="string")throw new Error("value must be string");let re=B.slice(0,s).map(g).join(",");return s===0?te("0u",U):s===1?te(re[0],U):(m.set=!0,m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}(${re}, ${U})`)},setByOffset:te,setByIndices:(B,U)=>s<2?te(B,U):(m.setByIndices=!0,m.indicesToOffset=!0,`set_${e}ByIndices(${B}, ${U});`),get:F,getByOffset:L,getByIndices:ue,usage:i,name:e,strides:v,shape:x,rank:s}},R=(e,t,r,i=1)=>hr(e,t,r,"input",i),H=(e,t,r,i=1)=>hr(e,t,r,"output",i),Ep=(e,t,r)=>hr(e,t,r,"atomicOutput",1),Ta=(e,t,r,i=1)=>hr(e,t,r,"internal",i),Fo=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=er){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let n=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,a=n?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=n?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${a}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let n=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${n}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ap=(e,t)=>new Fo(e,t)}),Ho,bn,Vo,Go,jo,Ko,qe,zp,Op,Ct=P(()=>{"use strict";ee(),ae(),ve(),se(),Ho=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},bn=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Vo=(e,t)=>A.sortBasedOnPerm(e,bn(e.length,t)),Go=(e,t,r,i)=>{let n=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let a=0;a<t;++a)n+=`a[${e[a]}]=i[${a}];`;return n+="return a;}"},jo=(e,t)=>{let r=[],i=[];for(let n=0;n<e.length;++n)e[n]!==1&&r.push(e[n]),e[t[n]]!==1&&i.push(t[n]);return{newShape:r,newPerm:i}},Ko=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},qe=(e,t)=>{let r=e.dataType,i=e.dims.length,n=bn(i,t),a=Vo(e.dims,n),s=e.dims,o=a,u=i<2||Ko(n,e.dims),d;if(u)return d=m=>{let _=R("input",r,s,4),x=H("output",r,o,4);return`
  ${m.registerUniform("output_size","u32").declareVariables(_,x)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let m=A.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64/4)},programUniforms:[{type:12,data:Math.ceil(m/4)}]}},getShaderSource:d};let{newShape:c,newPerm:f}=jo(e.dims,n),h=A.areEqual(f,[2,3,1]),g=A.areEqual(f,[3,1,2]);if(c.length===2||h||g){s=h?[c[0],c[1]*c[2]]:g?[c[0]*c[1],c[2]]:c,o=[s[1],s[0]];let m=16;return d=_=>{let x=R("a",r,s.length),v=H("output",r,o.length);return`
  ${_.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${m+1}>, ${m}>;
  ${_.mainStart([m,m,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${m} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${m}u + local_id.x;
    let input_row = workgroup_id_x * ${m}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${m}u + local_id.x;
    let output_row = workgroup_id_y * ${m}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let _=A.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(o[1]/m),y:Math.ceil(o[0]/m)},programUniforms:[{type:12,data:_},...Y(s,o)]}},getShaderSource:d}}return d=m=>{let _=R("a",r,s.length),x=H("output",r,o.length);return`
  ${m.registerUniform("output_size","u32").declareVariables(_,x)}

  ${Go(n,i,_,x)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",_.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let m=A.size(a);return{outputs:[{dims:a,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...Y(s,o)]}},getShaderSource:d}},zp=(e,t)=>{Ho(e.inputs,t.perm),e.compute(qe(e.inputs[0],t.perm))},Op=e=>fe({perm:e.perm})}),Yo,Xo,Zo,Qo,Jo,eu,tu,ru,iu,nu,je,Mp,Rp,Bp,Np,Dp,Pp,Lp,Up,Wp,qp,_0=P(()=>{"use strict";ee(),ae(),se(),Ia(),Ct(),Yo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},Xo={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},Zo={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},Qo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},Jo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},eu=(e,t)=>{let r=[],i=e.length;for(let a=0;a<i;a++)t.indexOf(a)===-1&&r.push(e[a]);let n=t.map(a=>e[a]);return[r,n]},tu=(e,t)=>{let r=e.length+t.length,i=[],n=0;for(let a=0;a<r;a++)t.indexOf(a)===-1?i.push(e[n++]):i.push(1);return i},ru=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},iu=(e,t)=>{let r=[];if(!ru(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},nu=(e,t,r,i,n,a,s)=>{let o=r[0].dims,u=A.size(a),d=A.size(s),c=R("_A",r[0].dataType,o),f=H("output",n,a),h=64;u===1&&(h=256);let g=`
          var<workgroup> aBestValues : array<f32, ${h}>;
       `,m=_=>`
        ${_.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${g}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${_.mainStart(h)}

          let outputIndex = global_idx / ${h};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${Zo[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${h}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${Yo[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${h}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${Xo[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${Qo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${h}`,inputDependencies:["type"]},getShaderSource:m,getRunData:()=>({outputs:[{dims:a,dataType:n}],dispatchGroup:{x:u},programUniforms:[{type:12,data:d}]})}},je=(e,t,r,i)=>{let n=e.inputs.length===1?r:ia(e.inputs,r),a=n.axes;a.length===0&&!n.noopWithEmptyAxes&&(a=e.inputs[0].dims.map((g,m)=>m));let s=A.normalizeAxes(a,e.inputs[0].dims.length),o=s,u=e.inputs[0],d=iu(o,e.inputs[0].dims.length);d.length>0&&(u=e.compute(qe(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],o=Jo(o.length,u.dims.length));let[c,f]=eu(u.dims,o),h=c;n.keepDims&&(h=tu(c,s)),e.compute(nu(t,n.cacheKey,[u],i,e.inputs[0].dataType,h,f),{inputs:[u]})},Mp=(e,t)=>{je(e,"ReduceMeanShared",t,"mean")},Rp=(e,t)=>{je(e,"ReduceL1Shared",t,"l1")},Bp=(e,t)=>{je(e,"ReduceL2Shared",t,"l2")},Np=(e,t)=>{je(e,"ReduceLogSumExpShared",t,"logSumExp")},Dp=(e,t)=>{je(e,"ReduceMaxShared",t,"max")},Pp=(e,t)=>{je(e,"ReduceMinShared",t,"min")},Lp=(e,t)=>{je(e,"ReduceProdShared",t,"prod")},Up=(e,t)=>{je(e,"ReduceSumShared",t,"sum")},Wp=(e,t)=>{je(e,"ReduceSumSquareShared",t,"sumSquare")},qp=(e,t)=>{je(e,"ReduceLogSumShared",t,"logSum")}}),Ke,au,di,ia,Ye,su,ou,uu,lu,du,pu,cu,fu,hu,mu,Xe,Fp,Hp,Vp,Gp,jp,Kp,Yp,Xp,Zp,Qp,Ia=P(()=>{"use strict";ee(),ae(),ve(),se(),_0(),Ke=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},au=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],di=(e,t,r,i,n,a,s=!1,o=!1)=>{let u=[],d=r[0].dims,c=d.length,f=A.normalizeAxes(n,c),h=!o&&f.length===0;d.forEach((_,x)=>{h||f.indexOf(x)>=0?s&&u.push(1):u.push(_)});let g=u.length,m=A.size(u);return{name:e,shaderCache:t,getShaderSource:_=>{let x=[],v=R("_A",r[0].dataType,c),b=H("output",a,g),S=i(v,b,f),k=S[2];for(let T=0,C=0;T<c;T++)h||f.indexOf(T)>=0?(s&&C++,k=`for(var j${T}: u32 = 0; j${T} < ${d[T]}; j${T}++) {
                  ${S[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${v.indicesSet("input_indices",T,`j${T}`)}
                  ${k}
                }`):(x.push(`${v.indicesSet("input_indices",T,b.indicesGet("output_indices",C))};`),C++);return`

        ${_.registerUniform("output_size","u32").declareVariables(v,b)}

        ${_.mainStart()}
          ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${k}
          ${S[3]}
          ${S.length===4?b.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:u,dataType:a}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...Y(d,u)]})}},ia=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),fe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},Ye=(e,t,r,i)=>{let n=e.inputs,a=n.length===1?r:ia(n,r);e.compute(di(t,{hint:a.cacheKey,inputDependencies:["rank"]},[n[0]],a.noopWithEmptyAxes&&a.axes.length===0?au:i,a.axes,n[0].dataType,a.keepDims,a.noopWithEmptyAxes),{inputs:[0]})},su=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},ou=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},uu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},lu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},du=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceMax",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(r.indicesSet("input_indices",s,0));return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},pu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceMean",t,(r,i,n)=>{let a=1;for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&(a*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${a});`]})},cu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceMin",t,(r,i,n)=>{let a=[];for(let s=0;s<r.rank;s++)(n.indexOf(s)>=0||n.length===0)&&a.push(`input_indices[${s}] = 0;`);return[`${a.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},fu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},hu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},mu=(e,t)=>{Ke(e.inputs),Ye(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},Xe=(e,t,r)=>{if(t.length===0)return r;let i=1,n=1;for(let a=0;a<t.length;a++)t.indexOf(a)===-1?i*=e[a]:n*=e[a];return n<32&&i>1024},Fp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?pu(e,t):Mp(e,t)},Hp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ou(e,t):Rp(e,t)},Vp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?uu(e,t):Bp(e,t)},Gp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?lu(e,t):Np(e,t)},jp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?du(e,t):Dp(e,t)},Kp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?cu(e,t):Pp(e,t)},Yp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?fu(e,t):Lp(e,t)},Xp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?hu(e,t):Up(e,t)},Zp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mu(e,t):Wp(e,t)},Qp=(e,t)=>{Xe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?su(e,t):qp(e,t)}}),wn,Jp,ec,na,b0=P(()=>{"use strict";ee(),ve(),Ia(),wn=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},Jp=(e,t)=>{wn(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(di("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ec=(e,t)=>{wn(e.inputs);let r=(i,n,a)=>{let s=[];for(let o=0;o<i.rank;o++)(a.indexOf(o)>=0||a.length===0)&&s.push(`input_indices[${o}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",n.setByOffset("global_idx","best_index")]};e.compute(di("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},na=e=>fe(e)}),gu,Zr,yu,_u,bu,Ir,wu,tc,Ca=P(()=>{"use strict";ee(),ae(),Sa(),se(),gu=(e,t)=>{let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5];if(s&&o)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let u=r.dims[0],d=r.dims[1],c=r.dims[2];if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(n.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=n.dims[0]/3,h=f,g=h;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],h=t.qkvHiddenSizes[1],g=t.qkvHiddenSizes[2]}let m=d;if(f!==h)throw new Error("qkv_hidden_sizes first element should be same as the second");if(n.dims[0]!==f+h+g)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let _=0;if(s){if(h!==g)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==u)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==h/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(_=s.dims[3])}let x=m+_,v=-1,b=0;if(a)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(o){if(o.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(o.dims[0]!==u||o.dims[1]!==t.numHeads||o.dims[2]!==d||o.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:u,sequenceLength:d,pastSequenceLength:_,kvSequenceLength:m,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:f,vHiddenSize:g,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(g/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Zr=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,yu=(e,t,r,i,n,a,s,o)=>{let u=we(s?1:a),d=64,c=a/u;c<d&&(d=32);let f=Math.ceil(a/u/d),h=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:n},{type:12,data:c},{type:12,data:f}],g=Se(e.dataType,u),m=Ee(1,u),_=["type"];s&&_.push("type"),o&&_.push("type");let x=v=>{let b=H("x",e.dataType,e.dims,u),S=[b],k=s?R("seq_lens",s.dataType,s.dims):void 0;k&&S.push(k);let T=o?R("total_sequence_length_input",o.dataType,o.dims):void 0;T&&S.push(T);let C=Ee(e.dataType),E=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(E).declareVariables(...S)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Zr(k,T,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${m}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${m}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(u){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${m}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${m}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(u){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${u}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${C}(1.0) / ${C}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${m}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${C}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${g};${u}`,inputDependencies:_},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:n,z:t*r},programUniforms:h})}},_u=(e,t,r,i,n,a,s,o,u)=>{let d=s+a.kvSequenceLength,c=[a.batchSize,a.numHeads,a.sequenceLength,d],f=e>1&&i,h=a.kvNumHeads?a.kvNumHeads:a.numHeads,g=f?[a.batchSize,h,d,a.headSize]:void 0,m=a.nReps?a.nReps:1,_=a.scale===0?1/Math.sqrt(a.headSize):a.scale,x=we(a.headSize),v=a.headSize/x,b=12,S={x:Math.ceil(d/b),y:Math.ceil(a.sequenceLength/b),z:a.batchSize*a.numHeads},k=[{type:12,data:a.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:1,data:_},{type:12,data:s},{type:12,data:a.kvSequenceLength},{type:12,data:m}],T=f&&i&&A.size(i.dims)>0,C=["type","type"];T&&C.push("type"),n&&C.push("type"),o&&C.push("type"),u&&C.push("type");let E=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&E.push({dims:g,dataType:t.dataType,gpuDataType:0});let z=N=>{let q=R("q",t.dataType,t.dims,x),Q=R("key",r.dataType,r.dims,x),V=[q,Q];if(T){let j=R("past_key",i.dataType,i.dims,x);V.push(j)}n&&V.push(R("attention_bias",n.dataType,n.dims));let te=o?R("seq_lens",o.dataType,o.dims):void 0;te&&V.push(te);let L=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;L&&V.push(L);let ie=H("output",t.dataType,c),X=[ie];f&&X.push(H("present_key",t.dataType,g,x));let F=Ee(1,x),ue=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${q.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${q.type.storage}, ${b*b}>;
  ${N.registerUniforms(ue).declareVariables(...V,...X)}
  ${N.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${m===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${m===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Zr(te,L,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${T&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${F}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${T&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${F}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${ie.type.value} (sum * uniforms.alpha) + ${n?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${n!==void 0};${i!==void 0};${e}`,inputDependencies:C},getRunData:()=>({outputs:E,dispatchGroup:S,programUniforms:k}),getShaderSource:z}},bu=(e,t,r,i,n,a,s=void 0,o=void 0)=>{let u=a+n.kvSequenceLength,d=n.nReps?n.nReps:1,c=n.vHiddenSize*d,f=e>1&&i,h=n.kvNumHeads?n.kvNumHeads:n.numHeads,g=f?[n.batchSize,h,u,n.headSize]:void 0,m=[n.batchSize,n.sequenceLength,c],_=12,x={x:Math.ceil(n.vHeadSize/_),y:Math.ceil(n.sequenceLength/_),z:n.batchSize*n.numHeads},v=[{type:12,data:n.sequenceLength},{type:12,data:u},{type:12,data:n.vHeadSize},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:12,data:c},{type:12,data:a},{type:12,data:n.kvSequenceLength},{type:12,data:d}],b=f&&i&&A.size(i.dims)>0,S=["type","type"];b&&S.push("type"),s&&S.push("type"),o&&S.push("type");let k=[{dims:m,dataType:t.dataType,gpuDataType:0}];f&&k.push({dims:g,dataType:t.dataType,gpuDataType:0});let T=C=>{let E=R("probs",t.dataType,t.dims),z=R("v",r.dataType,r.dims),N=[E,z];b&&N.push(R("past_value",i.dataType,i.dims));let q=s?R("seq_lens",s.dataType,s.dims):void 0;s&&N.push(q);let Q=o?R("total_sequence_length_input",o.dataType,o.dims):void 0;o&&N.push(Q);let V=[H("output",t.dataType,m)];f&&V.push(H("present_value",t.dataType,g));let te=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${_}u;
  var<workgroup> tileQ: array<${E.type.value}, ${_*_}>;
  var<workgroup> tileV: array<${E.type.value}, ${_*_}>;
  ${C.registerUniforms(te).declareVariables(...N,...V)}
  ${C.mainStart([_,_,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Zr(q,Q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${E.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:k,dispatchGroup:x,programUniforms:v}),getShaderSource:T}},Ir=(e,t,r,i,n,a,s,o,u,d,c=void 0,f=void 0)=>{let h=Math.min(e.outputCount,1+(s?1:0)+(o?1:0)),g=h>1?d.pastSequenceLength:0,m=g+d.kvSequenceLength,_=u&&A.size(u.dims)>0?u:void 0,x=[t,r];h>1&&s&&A.size(s.dims)>0&&x.push(s),_&&x.push(_),c&&x.push(c),f&&x.push(f);let v=e.compute(_u(h,t,r,s,_,d,g,c,f),{inputs:x,outputs:h>1?[-1,1]:[-1]})[0];e.compute(yu(v,d.batchSize,d.numHeads,g,d.sequenceLength,m,c,f),{inputs:c&&f?[v,c,f]:[v],outputs:[]});let b=[v,i];h>1&&o&&A.size(o.dims)>0&&b.push(o),c&&b.push(c),f&&b.push(f),e.compute(bu(h,v,i,o,d,g,c,f),{inputs:b,outputs:h>1?[0,2]:[0]})},wu=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,n=t.inputHiddenSize,a=t.headSize,s=12,o={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},u=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:n},{type:12,data:a},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let h=H("output_q",u[0].dataType,r),g=H("output_k",u[0].dataType,r),m=H("output_v",u[0].dataType,r),_=R("input",u[0].dataType,u[0].dims),x=R("weight",u[1].dataType,u[1].dims),v=R("bias",u[2].dataType,u[2].dims),b=_.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${f.registerUniforms(S).declareVariables(_,x,v,h,g,m)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:o,programUniforms:d}),getShaderSource:c},{inputs:u,outputs:[-1,-1,-1]})},tc=(e,t)=>{let r=gu(e.inputs,t),[i,n,a]=wu(e,r);return Ir(e,i,n,a,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),vu,$u,xu,rc,w0=P(()=>{"use strict";tt(),ee(),ae(),ve(),se(),vu=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,n,a)=>{let s=n.length;if(s!==i.length)throw new Error(`${a}: num dimensions != ${s}`);n.forEach((o,u)=>{if(o!==i[u])throw new Error(`${a}: dim[${u}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},$u=(e,t)=>{let{epsilon:r,spatial:i,format:n}=t,a=e[0].dims,s=i?we(a[a.length-1]):1,o=n==="NHWC"&&a.length>1?s:1,u=A.size(a)/s,d=i,c=d?a.length:a,f=R("x",e[0].dataType,e[0].dims,s),h=R("scale",e[1].dataType,e[1].dims,o),g=R("bias",e[2].dataType,e[2].dims,o),m=R("inputMean",e[3].dataType,e[3].dims,o),_=R("inputVar",e[4].dataType,e[4].dims,o),x=H("y",e[0].dataType,c,s),v=()=>{let S="";if(i)S=`let cOffset = ${a.length===1?"0u":n==="NHWC"?`outputIndices[${a.length-1}] / ${s}`:"outputIndices[1]"};`;else if(n==="NCHW")S=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${h.type.indices}(0);
                       cIndices[0] = outputIndices[${a.length-1}];`;for(let k=1;k<h.rank;k++)S+=`cIndices[${k}] = outputIndices[${k}];`;S+=`let cOffset = ${h.indicesToOffset("cIndices")};`}return S},b=S=>`
  const epsilon = ${r};
  ${S.registerUniform("outputSize","u32").declareVariables(f,h,g,m,_,x)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${h.getByOffset("cOffset")};
    let bias = ${g.getByOffset("cOffset")};
    let inputMean = ${m.getByOffset("cOffset")};
    let inputVar = ${_.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d?[{type:12,data:u},...Y(a)]:[{type:12,data:u}]})}},xu=e=>fe(e),rc=(e,t)=>{let{inputs:r,outputCount:i}=e,n=xu({...t,outputCount:i});if(ye.webgpu.validateInputContent&&vu(r,n),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute($u(r,n))}}),ku,Su,ic,v0=P(()=>{"use strict";ae(),se(),ku=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Su=e=>{let t=e[0].dims,r=e[0].dims[2],i=A.size(t)/4,n=e[0].dataType,a=R("input",n,t,4),s=R("bias",n,[r],4),o=R("residual",n,t,4),u=H("output",n,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(a,s,o,u)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${a.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${o.getByOffset("global_idx")};
    ${u.setByOffset("global_idx","value")}
  }`}},ic=e=>{ku(e.inputs),e.compute(Su(e.inputs))}}),Tu,ce,nc,ac,sc,oc,uc,lc,dc,pc,cc,Iu,fc,hc,mc,gc,xr,yc,ai,_c,bc,wc,vc,$c,xc,kc,Sc,Tc,Ic,Cc,Ec,Ac,zc,Oc,Mc,vn,Rc,aa,sa,Bc,Nc,Dc,Cu,Eu,Pc,Ea=P(()=>{"use strict";ee(),ae(),ve(),se(),Tu=(e,t,r,i,n,a,s)=>{let o=Math.ceil(t/4),u="";typeof n=="string"?u=`${n}(a)`:u=n("a");let d=R("inputData",r,[o],4),c=H("outputData",i,[o],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(d,c)}

  ${a??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",u)}
  }`},ce=(e,t,r,i,n,a=e.dataType,s,o)=>{let u=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return s&&u.push(...s),{name:t,shaderCache:{hint:n,inputDependencies:["type"]},getShaderSource:d=>Tu(d,A.size(e.dims),e.dataType,a,r,i,o),getRunData:d=>({outputs:[{dims:e.dims,dataType:a}],dispatchGroup:{x:Math.ceil(A.size(d[0].dims)/64/4)},programUniforms:u})}},nc=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},ac=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},sc=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},oc=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},uc=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},lc=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},dc=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},pc=e=>fe(e),cc=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Iu=e=>{let t,r,i=e.length>=2&&e[1].data!==0,n=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=n?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=n?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return fe({min:t,max:r})},fc=(e,t)=>{let r=t||Iu(e.inputs),i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",n=>`clamp(${n}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},hc=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},mc=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},gc=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},xr=e=>fe(e),yc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},ai=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,_c=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,ai(t)))},bc=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},wc=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},vc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,ai(t)))},$c=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},xc=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},kc=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Sc=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Tc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Ic=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Cc=e=>fe(e),Ec=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},Ac=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},zc=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Oc=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Mc=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},vn=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Rc=e=>{e.compute(ce(e.inputs[0],"Tanh",vn))},aa=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${vn("v")};
}
`,sa=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Bc=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",sa,aa(t),void 0,e.inputs[0].dataType))},Nc=(e,t)=>{let r=Ee(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Dc=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Cu=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Eu=e=>`quick_gelu_impl(${e})`,Pc=(e,t)=>{let r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Eu,Cu(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Au,zu,Lc,$0=P(()=>{"use strict";ae(),se(),Ea(),Au=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},zu=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=R("input",e[0].dataType,e[0].dims,4),i=R("bias",e[0].dataType,[e[0].dims[2]],4),n=H("output",e[0].dataType,t,4),a=A.size(t)/4,s=Se(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)}}),getShaderSource:o=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${o.declareVariables(r,i,n)}

  ${ai(s)}

  ${o.mainStart()}
    ${o.guardAgainstOutOfBoundsWorkgroupSizes(a)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Lc=e=>{Au(e.inputs),e.compute(zu(e.inputs))}}),Ou,Mu,Ze,Uc,Wc,qc,Fc,Hc,Vc,Gc,jc,Kc,Yc,x0=P(()=>{"use strict";ee(),ae(),se(),Ou=(e,t,r,i,n,a,s,o,u,d,c,f)=>{let h,g;typeof o=="string"?h=g=(b,S)=>`${o}((${b}),(${S}))`:typeof o=="function"?h=g=o:(h=o.scalar,g=o.vector);let m=H("outputData",c,i.length,4),_=R("aData",u,t.length,4),x=R("bData",d,r.length,4),v;if(n)if(a){let b=A.size(t)===1,S=A.size(r)===1,k=t.length>0&&t[t.length-1]%4===0,T=r.length>0&&r[r.length-1]%4===0;b||S?v=m.setByOffset("global_idx",g(b?`${_.type.value}(${_.getByOffset("0")}.x)`:_.getByOffset("global_idx"),S?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${_.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",g(s||k?_.getByOffset("offsetA / 4u"):`${_.type.value}(${_.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||T?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=m.setByOffset("global_idx",g(_.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!a)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(S,k,T="")=>{let C=`aData[indexA${k}][componentA${k}]`,E=`bData[indexB${k}][componentB${k}]`;return`
            let outputIndices${k} = ${m.offsetToIndices(`global_idx * 4u + ${k}u`)};
            let offsetA${k} = ${_.broadcastedIndicesToOffset(`outputIndices${k}`,m)};
            let offsetB${k} = ${x.broadcastedIndicesToOffset(`outputIndices${k}`,m)};
            let indexA${k} = offsetA${k} / 4u;
            let indexB${k} = offsetB${k} / 4u;
            let componentA${k} = offsetA${k} % 4u;
            let componentB${k} = offsetB${k} % 4u;
            ${S}[${k}] = ${T}(${h(C,E)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(_,x,m)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Mu=(e,t,r,i,n,a,s=r.dataType)=>{let o=r.dims.map(_=>Number(_)??1),u=i.dims.map(_=>Number(_)??1),d=!A.areEqual(o,u),c=o,f=A.size(o),h=!1,g=!1,m=[d];if(d){let _=Jt.calcShape(o,u,!1);if(!_)throw new Error("Can't perform binary op on the given tensors");c=_.slice(),f=A.size(c);let x=A.size(o)===1,v=A.size(u)===1,b=o.length>0&&o[o.length-1]%4===0,S=u.length>0&&u[u.length-1]%4===0;m.push(x),m.push(v),m.push(b),m.push(S);let k=1;for(let T=1;T<c.length;T++){let C=o[o.length-T],E=u[u.length-T];if(C===E)k*=C;else break}k%4===0?(g=!0,h=!0):(x||v||b||S)&&(h=!0)}else h=!0;return m.push(h),{name:e,shaderCache:{hint:t+m.map(_=>_.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:_=>Ou(_,o,u,c,h,d,g,n,r.dataType,i.dataType,s,a),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(c)/4)},...Y(o,u,c)]})}},Ze=(e,t,r,i,n,a)=>{e.compute(Mu(t,n??"",e.inputs[0],e.inputs[1],r,i,a))},Uc=e=>{Ze(e,"Add",(t,r)=>`${t}+${r}`)},Wc=e=>{Ze(e,"Div",(t,r)=>`${t}/${r}`)},qc=e=>{Ze(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Fc=e=>{Ze(e,"Mul",(t,r)=>`${t}*${r}`)},Hc=e=>{let t=R("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ze(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},Vc=e=>{Ze(e,"Sub",(t,r)=>`${t}-${r}`)},Gc=e=>{Ze(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},jc=e=>{Ze(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},Kc=e=>{Ze(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},Yc=e=>{Ze(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),Ru,Bu,Nu,Du,Xc,Zc,k0=P(()=>{"use strict";ee(),ae(),ve(),se(),Ru=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],n=i.dataType,a=i.dims.length;e.forEach((s,o)=>{if(o!==r){if(s.dataType!==n)throw new Error("input tensors should be one type");if(s.dims.length!==a)throw new Error("input tensors should have the same shape");s.dims.forEach((u,d)=>{if(d!==t&&u!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Bu=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Nu=(e,t)=>{let r=e.length,i=[];for(let n=0;n<r;++n){let a=t.setByOffset("global_idx",e[n].getByIndices("indices"));r===1?i.push(a):n===0?i.push(`if (inputIndex == ${n}u) { ${a} }`):n===r-1?i.push(`else { ${a} }`):i.push(`else if (inputIndex == ${n}) { ${a} }`)}return i.join(`
`)},Du=(e,t,r,i)=>{let n=A.size(r),a=new Array(e.length),s=new Array(e.length),o=0,u=[],d=[],c=[{type:12,data:n}];for(let _=0;_<e.length;++_)o+=e[_].dims[t],a[_]=o,d.push(e[_].dims.length),s[_]=R(`input${_}`,i,d[_]),u.push("rank"),c.push({type:12,data:a[_]});for(let _=0;_<e.length;++_)c.push(...Y(e[_].dims));c.push(...Y(r));let f=H("output",i,r.length),h=f.indicesGet("indices",t),g=Array.from(Array(a.length).keys()).map(_=>`uniforms.sizeInConcatAxis${_}`).join(","),m=_=>`

  ${(()=>{_.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)_.registerUniform(`sizeInConcatAxis${x}`,"u32");return _.declareVariables(...s,f)})()}

  ${Bu(a.length,g)}

  ${_.mainStart()}
    ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${a.length}u>(${g});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Nu(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}),getShaderSource:m}},Xc=(e,t)=>{let r=e.inputs,i=r[0].dims,n=A.normalizeAxis(t.axis,i.length);Ru(r,n);let a=i.slice();a[n]=r.reduce((o,u)=>o+(u.dims.length>n?u.dims[n]:0),0);let s=r.filter(o=>A.size(o.dims)>0);e.compute(Du(s,n,a,r[0].dataType),{inputs:s})},Zc=e=>fe({axis:e.axis})}),Ut,Wt,qt,Aa,Ht=P(()=>{"use strict";ee(),ae(),Ut=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Wt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},qt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Aa=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[xp,kp];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),Ie,Qc,za=P(()=>{"use strict";Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},Qc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),Jc,S0=P(()=>{"use strict";Jc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),Sr,Oa,Ma=P(()=>{"use strict";ee(),ae(),se(),Ht(),Sr=(e,t,r,i,n)=>{let a=i-r;return`
      ${Array.from({length:r}).map((s,o)=>`
      if (${G(t.shape,o,t.rank)} != 1) {
        ${t.indicesSet(e,o,G(n,o+a,i))}
      } else {
        ${t.indicesSet(e,o,0)}
      }`).join("")}
`},Oa=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s[s.length-2],d=o[o.length-1],c=s[s.length-1],f=we(d),h=we(c),g=we(u),m=A.size(r)/f/g,_=e.length>2,x=i?i.slice(0,-2):r.slice(0,-2),v=[A.size(x),u,d],b=[{type:12,data:m},{type:12,data:u},{type:12,data:d},{type:12,data:c}];Wt(t,b),b.push(...Y(x,s,o)),_&&b.push(...Y(e[2].dims)),b.push(...Y(v));let S=k=>{let T=Ta("batch_dims",e[0].dataType,x.length),C=R("a",e[0].dataType,s.length,h),E=R("b",e[1].dataType,o.length,f),z=H("output",e[0].dataType,v.length,f),N=Se(z.type.tensor),q=Ut(t,z.type.value,N),Q=[C,E],V="";if(_){let ie=n?f:1;Q.push(R("bias",e[2].dataType,e[2].dims.length,ie)),V=`${n?`value += bias[col / ${ie}];`:`value += ${z.type.value}(bias[row + i]);`}`}let te=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];qt(t,te);let L=()=>{let ie=`var a_data: ${C.type.value};`;for(let X=0;X<h;X++)ie+=`
              let b_data${X} = b[(b_offset + (k + ${X}) * uniforms.N + col) / ${f}];`;for(let X=0;X<g;X++){ie+=`a_data = a[(a_offset + (row + ${X}) * uniforms.K + k) / ${h}];`;for(let F=0;F<h;F++)ie+=`
            values[${X}] = fma(${E.type.value}(a_data${h===1?"":`[${F}]`}), b_data${F}, values[${X}]);
`}return ie};return`
  ${k.registerUniforms(te).registerInternalVariables(T).declareVariables(...Q,z)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${g};
    let row = (index1 % stride1) * ${g};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${T.offsetToIndices("batch")};`}

    var a_indices: ${C.type.indices};
    ${Sr("a_indices",C,C.rank-2,T.rank,"batch_indices")}
    ${C.indicesSet("a_indices",C.rank-2,0)}
    ${C.indicesSet("a_indices",C.rank-1,0)}
    let a_offset = ${C.indicesToOffset("a_indices")};

    var b_indices: ${E.type.indices};
    ${Sr("b_indices",E,E.rank-2,T.rank,"batch_indices")}
    ${E.indicesSet("b_indices",E.rank-2,0)}
    ${E.indicesSet("b_indices",E.rank-1,0)}
    let b_offset = ${E.indicesToOffset("b_indices")};
    var values: array<${z.type.value}, ${g}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${L()}
    }
    for (var i = 0u; i < ${g}u; i++) {
      var value = values[i];
      ${V}
      ${q}
      let cur_indices = ${z.type.indices}(batch, row + i, col);
      let offset = ${z.indicesToOffset("cur_indices")};
      ${z.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${h};${g};${n}`,inputDependencies:_?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:S}}}),Pu,Lu,oa,$n,Uu,ua,Wu,pi,Ra=P(()=>{"use strict";ee(),ae(),se(),Ht(),Ma(),za(),Pu=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Lu=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,oa=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32)=>{let u=t[1]*e[1],d=t[0]*e[0],c=n?u:a,f=n?a:u,h=c/t[0],g=a/t[1];if(!((n&&h===4&&e[1]===4||!n&&(h===3||h===4))&&c%t[0]===0&&a%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${n} is true, innerElementSize ${h} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${h} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${a} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${h}<${r}>, ${c/h}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${a}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${h};
const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${u};

  let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${g};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Pu(n,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${h===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Lu(n,h)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},$n=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Uu=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",ua=(e,t,r="f32",i,n=!1,a=32,s=!1,o=32,u=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],f=n?d:a,h=n?a:d;if(!(h%t[1]===0&&f%t[0]===0&&a%t[1]===0))throw new Error(`tileAHight ${h} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${a} must be divisible by workgroupSize[1]${t[1]}`);let g=h/t[1],m=f/t[0],_=a/t[1],x=u?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${$n(n,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${a}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${n?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${g};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${_};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${$n(n,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Uu(n)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${a}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${a};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(o/a)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${o}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Wu=(e,t,r,i,n=!1)=>{let[a,s,o,u]=i,d=Se(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ie(e,d)} {
      var value = ${Ie(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${Sr("aIndices",s,s.rank-2,a.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${a.type.indices}) -> ${Ie(e,d)} {
      var value = ${Ie(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${o.type.indices};
        ${Sr("bIndices",o,o.rank-2,a.rank,"batchIndices")}
        ${o.indicesSet("bIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("bIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ie(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${n?"bias[colIn]":`${Ie(e,d)}(bias[row])`};`:""}
        ${r}
        ${u.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},pi=(e,t,r,i,n=!1,a)=>{let s=e[0].dims,o=e[1].dims,u=s.slice(0,-2),d=o.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),f=A.size(c),h=s[s.length-2],g=s[s.length-1],m=o[o.length-1],_=g%4===0&&m%4===0,x=h<=8?[4,1,1]:[4,4,1],v=[8,8,1],b=[Math.ceil(m/v[0]/x[0]),Math.ceil(h/v[1]/x[1]),Math.ceil(f/v[2]/x[2])],S=_?4:1,k=[...u,h,g/S],T=k.length,C=[...d,g,m/S],E=C.length,z=[f,h,m/S],N=[{type:6,data:h},{type:6,data:m},{type:6,data:g}];Wt(t,N),N.push(...Y(c,k,C));let q=["rank","rank"],Q=e.length>2;Q&&(N.push(...Y(e[2].dims)),q.push("rank")),N.push(...Y(z));let V=te=>{let L=c.length,ie=Ta("batchDims",e[0].dataType,L,1),X=Se(e[0].dataType),F=R("a",e[0].dataType,T,S),ue=R("b",e[1].dataType,E,S),j=H("result",e[0].dataType,z.length,S),le=[F,ue];if(Q){let ne=n?S:1;le.push(R("bias",e[2].dataType,e[2].dims.length,ne))}let B=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];qt(t,B);let U=Se(j.type.tensor),re=Ut(t,j.type.value,U),O=Wu(S,Q,re,[ie,F,ue,j],n);return`
  ${te.registerUniforms(B).registerInternalVariables(ie).declareVariables(...le,j)}
  ${O}
  ${_?oa(x,v,X,ie):ua(x,v,X,ie)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${_};${n}`,inputDependencies:q},getRunData:()=>({outputs:[{dims:a?a(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:N}),getShaderSource:V}}}),qu,ef,T0=P(()=>{"use strict";ee(),mt(),se(),Ht(),za(),S0(),Ra(),qu=(e,t,r,i,n=!1,a,s=4,o=4,u=4,d="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},h=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,g=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,m=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",_=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${Ie(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${m} && xCol >= 0 && xCol < ${_}) {
      ${h}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,S=e?t&&i?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${Ie(s,d)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${Ie(s,d)}(0.0);`,k=e?i&&r?f(o):`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(o)}
    }
    return ${Ie(o,d)}(0.0);`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(o)}
    }
    return ${Ie(o,d)}(0.0);`,T=Ie(u,d),C=Ie(e?s:o,d),E=Ie(e?o:s,d),z=Ut(a,T,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${C} {
      ${e?S:k}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?k:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${T}) {
      let col = colIn * ${u};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${g}
      ${Qc(n)}
      ${z}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},ef=(e,t,r,i,n,a,s,o,u)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],f=r[0],h=d?r[2]:r[3],g=d?r[1]:r[2],m=d?r[3]:r[1],_=d&&(c%4===0||c%3===0)&&m%4===0,x=d?m:h*g,v=d?h*g:m,b=[8,8,1],S=i<=8?[4,1,1]:[4,4,1],k=[Math.ceil(x/b[0]/S[0]),Math.ceil(v/b[1]/S[1]),Math.ceil(f/b[2]/S[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${k}`);let T=_?d&&c%4!==0?3:4:1,C=b[1]*S[1],E=b[0]*S[0],z=Math.max(b[0]*T,b[1]),N=i%C===0,q=n%E===0,Q=a%z===0,V=_?[T,4,4]:[1,1,1],te=[{type:6,data:i},{type:6,data:n},{type:6,data:a},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Wt(t,te),te.push(...Y(e[0].dims,e[1].dims));let L=["rank","rank"];s&&(te.push(...Y(e[2].dims)),L.push("rank")),te.push(...Y(r));let ie=X=>{let F=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];qt(t,F);let ue=_?4:1,j=Se(e[0].dataType),le=`
      fn setOutputAtIndex(flatIndex : i32, value : ${_?`vec4<${j}>`:j}) {
        result[flatIndex] = ${_?`vec4<${j}>`:j}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${_?`vec4<${j}>`:j}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${_?"/ 4":""}, value);
      }`,B=R("x",e[0].dataType,e[0].dims.length,T===3?1:T),U=R("w",e[1].dataType,e[1].dims.length,ue),re=[B,U],O=H("result",e[0].dataType,r.length,ue);if(s){let ne=R("bias",e[2].dataType,e[2].dims.length,ue);re.push(ne),le+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${_?`vec4<${j}>`:j} {
          return bias[coords.${d?"w":"y"}${_?"/ 4":""}];
        }`}return`
        ${Jc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${X.registerUniforms(F).declareVariables(...re,O)}
        ${le}
        ${qu(d,N,q,Q,s,t,V[0],V[1],V[2],j)}
        ${_?oa(S,b,j,void 0,!d,z):ua(S,b,j,void 0,!d,z,!1,void 0,o)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${T};${_};${N};${q};${Q};${C};${E};${z}`,inputDependencies:L},getRunData:()=>({outputs:[{dims:u?u(r):r,dataType:e[0].dataType}],dispatchGroup:{x:k[0],y:k[1],z:k[2]},programUniforms:te}),getShaderSource:ie}}}),Fu,xn,mr,Hu,kn,Vu,tf,rf,I0=P(()=>{"use strict";ee(),mt(),ae(),se(),Ht(),za(),Fu=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},xn=e=>typeof e=="number"?[e,e,e]:e,mr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Hu=(e,t,r,i=1)=>{let n=mr(t,i);return Math.floor((e[0]*(r-1)-r+n)/2)},kn=(e,t,r,i,n)=>{n==null&&(n=Hu(e,t[0],i[0]));let a=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*n>=t[s]&&(a[s]=Math.trunc((e[s]-t[s]+2*n)/i[s]+1));return a},Vu=(e,t,r,i,n,a,s,o,u,d)=>{let c,f,h,g;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let m=kn([t,r,i,1],[o,u,d],1,[n,a,s],e);f=m[0],h=m[1],g=m[2]}else if(Array.isArray(e)){if(!e.every((_,x,v)=>_===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let m=kn([t,r,i,1],[o,u,d],1,[n,a,s],e[0]);f=m[0],h=m[1],g=m[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/n),h=Math.ceil(r/a),g=Math.ceil(i/s);let m=(f-1)*n+o-t,_=(h-1)*a+u-r,x=(g-1)*s+d-i,v=Math.floor(m/2),b=m-v,S=Math.floor(_/2),k=_-S,T=Math.floor(x/2),C=x-T;c={top:S,bottom:k,left:T,right:C,front:v,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:h,outWidth:g}},tf=(e,t,r,i,n,a=!1,s="channelsLast")=>{let o,u,d,c,f;if(s==="channelsLast")[o,u,d,c,f]=e;else if(s==="channelsFirst")[o,f,u,d,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[h,,g,m,_]=t,[x,v,b]=xn(r),[S,k,T]=xn(i),C=mr(g,S),E=mr(m,k),z=mr(_,T),{padInfo:N,outDepth:q,outHeight:Q,outWidth:V}=Vu(n,u,d,c,x,v,b,C,E,z),te=a?h*f:h,L=[0,0,0,0,0];return s==="channelsFirst"?L=[o,te,q,Q,V]:s==="channelsLast"&&(L=[o,q,Q,V,te]),{batchSize:o,dataFormat:s,inDepth:u,inHeight:d,inWidth:c,inChannels:f,outDepth:q,outHeight:Q,outWidth:V,outChannels:te,padInfo:N,strideDepth:x,strideHeight:v,strideWidth:b,filterDepth:g,filterHeight:m,filterWidth:_,effectiveFilterDepth:C,effectiveFilterHeight:E,effectiveFilterWidth:z,dilationDepth:S,dilationHeight:k,dilationWidth:T,inShape:e,outShape:L,filterShape:t}},rf=(e,t,r,i,n,a)=>{let s=a==="channelsLast",o=s?e[0].dims[3]:e[0].dims[1],u=!1,d=[64,1,1],c={x:r.map((b,S)=>S)},f=[Math.ceil(Fu(c.x.map(b=>r[b]))/d[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let h=u?s&&o%4!==0?3:4:1,g=A.size(r),m=[{type:12,data:g},{type:12,data:i},{type:12,data:n},{type:12,data:t.strides},{type:12,data:t.dilations}];Wt(t,m),m.push(...Y(e[0].dims,e[1].dims));let _=["rank","rank"],x=e.length===3;x&&(m.push(...Y(e[2].dims)),_.push("rank")),m.push(...Y(r));let v=b=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:n.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];qt(t,S);let k=u?4:1,T=Se(e[0].dataType),C=R("x",e[0].dataType,e[0].dims.length,h===3?1:h),E=R("W",e[1].dataType,e[1].dims.length,k),z=[C,E],N=H("result",e[0].dataType,r.length,k),q="";if(x){let te=R("bias",e[2].dataType,e[2].dims.length,k);z.push(te),q+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${u?`vec4<${T}>`:T} {
          return bias[${s?G("coords",4,5):G("coords",1,5)}${u?"/ 4":""}];
        }`}let Q=Ie(h,T),V=Ut(t,Q,T);return`
            ${q}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${C.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
          ${b.registerUniforms(S).declareVariables(...z,N)}
          ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${G("coords",0,C.rank)};
              let d2 = ${s?G("coords",C.rank-1,C.rank):G("coords",1,C.rank)};
              let xFRCCorner = vec3<u32>(${s?G("coords",1,C.rank):G("coords",2,C.rank)},
              ${s?G("coords",2,C.rank):G("coords",3,C.rank)},
              ${s?G("coords",3,C.rank):G("coords",4,C.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?G("uniforms.x_shape",1,C.rank):G("uniforms.x_shape",2,C.rank)};
              let xShapeZ = ${s?G("uniforms.x_shape",2,C.rank):G("uniforms.x_shape",3,C.rank)};
              let xShapeW = ${s?G("uniforms.x_shape",3,C.rank):G("uniforms.x_shape",4,C.rank)};
              let xShapeU = ${s?G("uniforms.x_shape",4,C.rank):G("uniforms.x_shape",1,C.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${V}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${h};${x}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:m}),getShaderSource:v}}}),nf,af,C0=P(()=>{"use strict";ee(),ae(),se(),Ht(),nf=(e,t,r,i)=>{let n=e.length>2,a=n?"value += b[output_channel];":"",s=e[0].dims,o=e[1].dims,u=t.format==="NHWC",d=u?r[3]:r[1],c=d/t.group,f=u&&c>=4?we(d):1,h=A.size(r)/f,g=[{type:12,data:h},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Wt(t,g),g.push(...Y(s,[o[0],o[1],o[2],o[3]/f]));let m=n?["rank","rank","rank"]:["rank","rank"];g.push(...Y([r[0],r[1],r[2],r[3]/f]));let _=x=>{let v=H("output",e[0].dataType,r.length,f),b=Se(v.type.tensor),S=Ut(t,v.type.value,b),k=R("x",e[0].dataType,s.length),T=R("w",e[1].dataType,o.length,f),C=[k,T];n&&C.push(R("b",e[2].dataType,e[2].dims,f));let E=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];qt(t,E);let z=u?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${k.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${T.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${k.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${T.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(E).declareVariables(...C,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${u?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${u?1:2}], outputIndices[${u?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${u?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${z}
    ${a}
    ${S}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},af=(e,t,r,i)=>{let n=e.length>2,a=we(r[3]),s=we(r[2]),o=A.size(r)/a/s,u=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/a],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/a],c=[r[0],r[1],r[2],r[3]/a],f=[{type:12,data:o},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Wt(t,f),f.push(...Y(u,d,c));let h=(s-1)*t.strides[1]+d[1],g=m=>{let _=H("output",e[0].dataType,c.length,a),x=Se(_.type.tensor),v=Ut(t,_.type.value,x),b=R("x",e[0].dataType,u.length,a),S=R("w",e[1].dataType,d.length,a),k=[b,S];n&&k.push(R("b",e[2].dataType,e[2].dims,a));let T=n?"value += b[output_channel];":"",C=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return qt(t,C),`
  ${m.registerUniforms(C).declareVariables(...k,_)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${h}>;
    var values: array<${_.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${T}
      ${v}
      ${_.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${a};${s};${h};${d[0]};${d[1]}`,inputDependencies:n?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:f}),getShaderSource:g}}}),Gu,Qr,ju,Jr,la,Sn,Ku,Yu,da,E0=P(()=>{"use strict";ae(),T0(),I0(),Ra(),C0(),Ht(),Ma(),Ct(),Gu=(e,t,r,i,n,a)=>{let s=e[0],o=e.slice(a?1:2,a?3:4),u=o.length,d=t[0],c=t.slice(2).map((h,g)=>h+(h-1)*(r[g]-1)),f=o.map((h,g)=>h+i[g]+i[g+u]).map((h,g)=>Math.floor((h-c[g]+n[g])/n[g]));return f.splice(0,0,s),f.splice(a?3:1,0,d),f},Qr=[2,3,1,0],ju=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Jr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let a=2;a<t[1].dims.length;++a)r[a-2]===0&&(r[a-2]=t[1].dims[a]);let i=e.pads.slice();li.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let n=Object.assign({},e);return Object.assign(n,{kernelShape:r,pads:i}),n},la=e=>{let t=Aa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],n=e.dilations,a=e.group,s=e.kernel_shape,o=e.pads,u=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Sn=(e,t,r,i)=>{let n=r.format==="NHWC",a=Gu(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,n);if(r.group!==1){let C=[t[0]];if(n){let E=e.kernelCustomData.wT??e.compute(qe(t[1],Qr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=E),C.push(E)}else C.push(t[1]);t.length===3&&C.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&n&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(af(C,r,a,i),{inputs:C}):e.compute(nf(C,r,a,i),{inputs:C});return}let s=t.length===3,o=t[0].dims[n?1:2],u=t[0].dims[n?2:3],d=t[0].dims[n?3:1],c=t[1].dims[2],f=t[1].dims[3],h=a[n?1:2],g=a[n?2:3],m=a[n?3:1],_=n&&c===o&&f===u&&r.pads[0]===0&&r.pads[1]===0;if(_||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let C=a[0],E,z,N,q=[];if(n){let te=e.kernelCustomData.wT??e.compute(qe(t[1],Qr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=te),_){let L=o*u*d;E=t[0].reshape([1,C,L]),z=te.reshape([1,L,m]),N=[1,C,m]}else E=t[0].reshape([C,o*u,d]),z=te.reshape([1,d,m]),N=[C,h*g,m];q.push(E),q.push(z)}else E=t[0].reshape([C,d,o*u]),z=t[1].reshape([1,m,d]),N=[C,m,h*g],q.push(z),q.push(E);s&&q.push(t[2]);let Q=N[2],V=q[0].dims[q[0].dims.length-1];Q<8&&V<8?e.compute(Oa(q,r,a,N,n,i),{inputs:q}):e.compute(pi(q,r,a,N,n,i),{inputs:q});return}let x=!0,v=e.kernelCustomData.wT??e.compute(qe(t[1],Qr),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let b=[t[0],v];s&&b.push(t[2]);let S=n?h*g:m,k=n?m:h*g,T=c*f*d;e.compute(ef(b,r,a,S,k,T,s,x,i),{inputs:b})},Ku=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=[0,t.pads[0],0,t.pads[1]],a=[1].concat(t.strides),s=[1].concat(t.dilations),o=[1].concat(t.kernelShape),u=Jr({...t,pads:n,strides:a,dilations:s,kernelShape:o},i);Sn(e,i,u,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},Yu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",n=Jr(r,t),a=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=tf(t[0].dims,t[1].dims,r.strides,r.dilations,a,!1,i);e.compute(rf(t,n,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},da=(e,t)=>{if(ju(e.inputs,t),e.inputs[0].dims.length===3)Ku(e,t);else if(e.inputs[0].dims.length===5)Yu(e,e.inputs,t);else{let r=Jr(t,e.inputs);Sn(e,e.inputs,r)}}}),sf,A0=P(()=>{"use strict";ee(),mt(),ae(),se(),sf=(e,t,r)=>{let i=e.length>2,n=t.outputShape,a=t.format==="NHWC",s=t.group,o=e[1].dims,u=o[2]/s,d=o[3],c=a?we(u):1,f=a&&d===1&&u>=4,h=f?Math.floor(u/4)*4:Math.floor(u/c)*c,g=u-h,m=a?we(d):1,_=a?d===1?c:m:1,x=A.size(n)/m,v=[Math.ceil(x/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let b=["rank","rank"],S=[t.strides[0],t.strides[1]],k=[t.kernelShape[a?1:2],t.kernelShape[a?2:3]],T=[t.dilations[0],t.dilations[1]],C=[k[0]+(t.dilations[0]<=1?0:(t.kernelShape[a?1:2]-1)*(t.dilations[0]-1)),k[1]+(t.dilations[1]<=1?0:(t.kernelShape[a?2:3]-1)*(t.dilations[1]-1))],E=[C[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),C[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],z=[{type:12,data:x},{type:12,data:S},{type:12,data:k},{type:12,data:T},{type:12,data:C},{type:6,data:E},{type:12,data:h},{type:12,data:u},{type:12,data:d},...Y(e[0].dims,e[1].dims)];i&&(z.push(...Y(e[2].dims)),b.push("rank")),z.push(...Y(n));let N=q=>{let Q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:k.length},{name:"dilations",type:"u32",length:k.length},{name:"effective_filter_dims",type:"u32",length:C.length},{name:"pads",type:"i32",length:E.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],V=Se(e[0].dataType),te=a?1:2,L=a?2:3,ie=a?3:1,X=R("W",e[1].dataType,e[1].dims.length,_),F=R("Dy",e[0].dataType,e[0].dims.length,c),ue=[F,X];i&&ue.push(R("bias",e[2].dataType,[n[ie]].length,m));let j=H("result",e[0].dataType,n.length,m),le=()=>{let re="";if(f)c===4?re+=`
        let xValue = ${F.getByOffset("x_offset")};
        let wValue = ${X.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?re+=`
          dotProd = dotProd + dot(vec4<${V}>(${F.getByOffset("x_offset")}, ${F.getByOffset("x_offset + 1u")}), vec4<${V}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(re+=`
          dotProd = dotProd + dot(vec4<${V}>(${F.getByOffset("x_offset")}, ${F.getByOffset("x_offset + 1u")}, ${F.getByOffset("x_offset + 2u")}, ${F.getByOffset("x_offset + 3u")}), vec4<${V}>(${X.getByOffset("w_offset")}, ${X.getByOffset("w_offset + 1u")}, ${X.getByOffset("w_offset + 2u")}, ${X.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(re+=`
                  let xValue = ${a?F.getByOffset(`${F.indicesToOffset(`${F.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):F.get("batch","inputChannel","idyR","idyC")};
        `,c===1)re+=`
          let w_offset = ${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${X.getByOffset(`w_offset / ${_}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let O=0;O<c;O++)re+=`
            let wValue${O} = ${X.getByOffset(`${X.indicesToOffset(`${X.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${O}, wOutChannel)`)} / ${_}`)};
            dotProd = dotProd + xValue[${O}] * wValue${O};`;return re},B=()=>{if(g===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let re="";if(c===1){re+="dotProd = dotProd";for(let O=0;O<g;O++)re+=`
            + ${F.getByOffset(`x_offset + ${O}`)} * ${X.getByOffset(`w_offset + ${O}`)}`;re+=";"}else if(c===2){if(g!==2)throw new Error(`Invalid inputChannelsRemainder ${g}.`);re+=`
          let xValue = ${F.getByOffset("x_offset")};
          let wValue = ${X.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return re},U=`
            let outputIndices = ${j.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${j.indicesGet("outputIndices",0)};
            let d1 = ${j.indicesGet("outputIndices",ie)};
            let r = ${j.indicesGet("outputIndices",te)};
            let c = ${j.indicesGet("outputIndices",L)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${j.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${V}(dyRCorner) + ${V}(wR)) / ${V}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${V}(uniforms.Dy_shape[${te}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${V}(dyCCorner) + ${V}(wC)) / ${V}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${V}(uniforms.Dy_shape[${L}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${F.indicesToOffset(`${F.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${X.indicesToOffset(`${X.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${_};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${le()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${B()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${m}]`:""};
            ${j.setByOffset("global_idx","value")};
          `;return`
    ${q.registerUniforms(Q).declareVariables(...ue,j)}
      ${q.mainStart()}
      ${q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${U}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${_}${m}${f}${g}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(n):n,dataType:e[0].dataType}],programUniforms:z}),getShaderSource:N}}}),Xu,Zu,Qu,Tn,of,Ju,In,el,uf,z0=P(()=>{"use strict";A0(),Ht(),Ct(),Xu=(e,t,r,i,n,a)=>(e-1)*t+r+(i-1)*n+1-a,Zu=(e,t,r,i,n)=>{let a=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=a,r[n]=e-a):t==="SAME_LOWER"&&(r[i]=e-a,r[n]=a)},Qu=(e,t,r,i,n,a,s,o,u,d)=>{let c=e.length-2,f=d.length===0;u.length<c&&u.push(...Array(c-u.length).fill(0));let h=e[0],g=t[o?3:1]*n;for(let m=0,_=e.length-c-(o?1:0);m<c;++m,++_){let x=e[_],v=f?x*s[m]:d[m],b=Xu(x,s[m],a[m],t[_],r[m],v);Zu(b,i,a,m,m+c),f&&d.push(s[m]*(x-1)+u[m]+(t[_]-1)*r[m]+1-a[m]-a[m+c])}d.splice(0,0,h),d.splice(o?3:1,0,g)},Tn=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,h)=>f*h,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let n=e.pads.slice(),a=e.outputShape.slice(),s=e.outputPadding.slice(),o=t[0].dims,u=e.dilations.slice();if(u.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;u=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,h)=>f+h,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}Qu(o,r,u,e.autoPad,e.group,n,d,i,s,a);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:n,outputPadding:s,outputShape:a,dilations:u,strides:d}),c},of=e=>{let t=Aa(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],n=e.dilations,a=e.group,s=e.kernelShape,o=e.pads,u=e.strides,d=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:n,group:a,kernelShape:s,outputPadding:c,outputShape:f,pads:o,strides:u,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},Ju=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let n=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==n))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.reduce((s,o)=>s+o,0)>0&&t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.reduce((s,o)=>s+o,0)>0&&t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.reduce((s,o)=>s+o,0)>0&&t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.outputPadding.length!==a&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${a}D`);if(t.kernelShape.reduce((s,o)=>s+o,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},In=(e,t,r,i)=>{let n=e.kernelCustomData.wT??e.compute(qe(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=n);let a=[t[0],n];t.length===3&&a.push(t[2]),e.compute(sf(a,r,i),{inputs:a})},el=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let n=t.kernelShape;(n.length===0||n[0]===0)&&(n=[e.inputs[1].dims[2]]);let a=t.dilations;(a.length===0||a[0]===0)&&(a=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let o=t.pads;o.length===0&&(o=[0,0]),o=[0,o[0],0,o[1]],s=[1].concat(s),a=[1].concat(a),n=[1].concat(n);let u=t.outputPadding;u=[0].concat(u);let d=Tn({...t,pads:o,strides:s,dilations:a,kernelShape:n,outputPadding:u},i);In(e,i,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},uf=(e,t)=>{if(Ju(e.inputs,t),e.inputs[0].dims.length===3)el(e,t);else{let r=Tn(t,e.inputs);In(e,e.inputs,r)}}}),tl,lf,df,O0=P(()=>{"use strict";ee(),ae(),ve(),se(),tl=(e,t,r,i)=>{let n=A.size(t),a=t.length,s=R("input",e,a),o=H("output",e,a),u=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=A.normalizeAxis(u,a),c=f=>{let h=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,g=G("uniforms.input_shape","uniforms.axis",a),m=i.reverse?h+(i.exclusive?" + 1":""):"0",_=i.reverse?g:h+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,o)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${o.offsetToIndices("global_idx")};
                  var sum = ${o.type.value}(0);
                  let first : i32 = ${m};
                  let last : i32 = ${_};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${o.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},{type:12,data:d},...Y(t,t)]}),getShaderSource:c}},lf=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,n=e.inputs[1];e.compute(tl(i,r,n,t),{inputs:[0]})},df=e=>{let t=e.exclusive===1,r=e.reverse===1;return fe({exclusive:t,reverse:r})}}),rl,il,nl,pf,cf,M0=P(()=>{"use strict";ee(),ae(),ve(),se(),rl=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},il=(e,t,r,i)=>{let n=[];n.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let a=0;a<t;++a)n.push(r.indicesSet("a",e[a],`i[${a}]`));return n.push("return a;}"),n.join(`
`)},nl=(e,t)=>{let r,i,n,a,s,o,u=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";u?([r,i,n,a]=e.dims,s=c?[r,i,n,d,d,a/d**2]:[r,i,n,a/d**2,d,d],o=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,n,a]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,d,d,a/d**2,i,n]:[r,a/d**2,d,d,i,n],o=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),h=f.dims.length,g=e.dataType,m=R("a",g,h),_=H("output",g,h),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(m,_)}

  ${il(o,h,m,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",m.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let b=u?[r,i*d,n*d,a/d**2]:[r,a/d**2,i*d,n*d],S=A.size(b),k=f.dims,T=A.sortBasedOnPerm(k,o);return{outputs:[{dims:b,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...Y(k,T)]}},getShaderSource:x}},pf=(e,t)=>{rl(e.inputs),e.compute(nl(e.inputs[0],t))},cf=e=>fe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),ei,gr,Cn,al,sl,ol,ul,En,ll,ff,hf,R0=P(()=>{"use strict";ee(),ae(),ve(),se(),ei="[a-zA-Z]|\\.\\.\\.",gr="("+ei+")+",Cn="^"+gr+"$",al="("+gr+",)*"+gr,sl="^"+al+"$",ol=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},ul=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(sl)))throw new Error("Invalid LHS term");if(r.split(",").forEach((n,a)=>{let s=e[a].dims.slice();if(!n.match(RegExp(Cn)))throw new Error("Invalid LHS term");let o=this.processTerm(n,!0,s,a);this.lhs.push(o)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([n,a])=>a.count===1||n==="...").map(([n])=>n).join("");else if(!i.match(RegExp(gr)))throw new Error("Invalid RHS");i.match(RegExp(ei,"g"))?.forEach(n=>{if(n==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let a=this.symbolToInfo.get(n);if(a===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(a.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let n=r.length,a=!1,s=[],o=0;if(!e.match(RegExp(Cn))&&!t&&e!=="")throw new Error("Invalid LHS term");let u=e.match(RegExp(ei,"g")),d=new ol(i);return u?.forEach((c,f)=>{if(c==="..."){if(a)throw new Error("Only one ellipsis is allowed per input term");a=!0;let h=n-u.length+1;if(h<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(o,o+h),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let g=0;g<s.length;g++){let m=String.fromCharCode(48+g);d.addSymbol(m,f+g),this.addSymbol(m,r[o++],i)}}else d.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[o++],i)}),d}},En=e=>e+"_max",ll=(e,t,r,i)=>{let n=e.map(d=>d.length).map((d,c)=>R(`input${c}`,t,d)),a=A.size(i),s=H("output",t,i.length),o=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),u=d=>{let c=[],f="var prod = 1.0;",h="var sum = 0.0;",g="sum += prod;",m=[],_=[],x=[],v=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((k,T)=>{if(r.rhs.symbolToIndices.has(T)){let C=r.rhs.symbolToIndices.get(T)?.[0];C!==void 0&&r.lhs.forEach((E,z)=>{if(k.inputIndices.includes(z)){let N=E.symbolToIndices.get(T);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(q=>{c.push(`${n[z].indicesSet(`input${z}Indices`,q,s.indicesGet("outputIndices",C))}`)})}})}else r.lhs.forEach((C,E)=>{if(k.inputIndices.includes(E)){let z=C.symbolToIndices.get(T);if(z===void 0)throw new Error("Invalid symbol error");z.forEach(N=>{m.push(`${n[E].indicesSet(`input${E}Indices`,N,`${T}`)}`)}),v.push(`prod *= ${n[E].getByIndices(`input${E}Indices`)};`)}}),_.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${En(T)}; ${T}++) {`),x.push("}")});let S=b?[...c,`let sum = ${n.map((k,T)=>k.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...c,h,..._,...m,f,...v,g,...x];return`
            ${d.registerUniforms(o.map(k=>({name:`${En(k)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...n,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${n.map((k,T)=>`var input${T}Indices: ${n[T].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=o.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:a});let c=e.map((f,h)=>[...Y(f)]).reduce((f,h)=>f.concat(h),d);return c.push(...Y(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}},getShaderSource:u}},ff=(e,t)=>{let r=new ul(e.inputs,t.equation),i=r.outputDims,n=e.inputs.map((a,s)=>a.dims);e.compute(ll(n,e.inputs[0].dataType,r,i))},hf=e=>{let t=e.equation.replace(/\s+/g,"");return fe({equation:t})}}),dl,An,pl,cl,mf,B0=P(()=>{"use strict";ee(),ae(),se(),dl=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,n=t.length<r.length?0:t.length-r.length;for(;i<r.length&&n<t.length;++i,++n)if(r[i]!==t[n]&&r[i]!==1&&t[n]!==1)throw new Error("Expand requires shape to be broadcastable to input")},An=(e,t)=>{let r=e.length-t.length,i=[];for(let n=0;n<r;++n)i.push(e[n]);for(let n=0;n<t.length;++n)i.push(t[n]===1?e[n+r]:t[n]);return i},pl=(e,t)=>e.length>t.length?An(e,t):An(t,e),cl=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=pl(t,r),n=e[0].dataType,a=n===9||A.size(t)===1,s=n===9||t.length>0&&t[t.length-1]%4===0?4:1,o=a||i.length>0&&i[i.length-1]%4===0?4:1,u=Math.ceil(A.size(i)/o),d=f=>{let h=R("input",n,t.length,s),g=H("output",n,i.length,o),m;if(n===9){let _=(x,v,b="")=>`
          let outputIndices${v} = ${g.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${h.broadcastedIndicesToOffset(`outputIndices${v}`,g)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${b}(${h.getByOffset(`index${v}`)}[component${v}]);
        `;m=`
        let outputOffset = global_idx * ${o};
        var data = vec4<u32>(0);
        ${_("data",0,"u32")}
        ${_("data",1,"u32")}
        ${_("data",2,"u32")}
        ${_("data",3,"u32")}
        ${g.setByOffset("global_idx","data")}
      }`}else m=`
        let outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
        let inputOffset = ${h.broadcastedIndicesToOffset("outputIndices",g)};
        let data = ${g.type.value}(${h.getByOffset(`inputOffset / ${s}`)});
        ${g.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(h,g)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${m}`},c=[{type:12,data:u},...Y(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${o}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c})}},mf=e=>{dl(e.inputs),e.compute(cl(e.inputs),{inputs:[0]})}}),fl,gf,N0=P(()=>{"use strict";ee(),ae(),se(),Ea(),fl=e=>{let t=e[0].dataType,r=A.size(e[0].dims),i=A.size(e[1].dims),n=i%4===0,a=s=>{let o=R("x",t,[1],4),u=R("bias",t,[1],4),d=H("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=g=>`
      let bias${g}_offset: u32 = (global_idx * 4 + ${g}) % uniforms.bias_size;
      let bias${g} = ${u.getByOffset(`bias${g}_offset / 4`)}[bias${g}_offset % 4];`,h=n?`
      let bias = ${u.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${o.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(o,u,d)}

    ${aa(Ee(t))}

    ${s.mainStart(er)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${o.getByOffset("global_idx")};
      ${h}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",sa("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:a,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/er/4)}})}},gf=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?Bc(e):e.compute(fl(e.inputs))}}),hl,ml,yf,_f,D0=P(()=>{"use strict";ee(),ae(),ve(),se(),hl=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},ml=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=A.normalizeAxis(t.axis,n),s=r.slice(0);s.splice(a,1,...i);let o=r[a],u=e[0].dataType===9?4:1,d=Math.ceil(A.size(s)/u),c=[{type:12,data:d},{type:6,data:o},{type:12,data:a},...Y(e[0].dims,e[1].dims,s)],f=h=>{let g=R("data",e[0].dataType,e[0].dims.length,u),m=R("inputIndices",e[1].dataType,e[1].dims.length),_=H("output",e[0].dataType,s.length,u),x=b=>{let S=i.length,k=`var indicesIndices${b}  = ${m.type.indices}(0);`;for(let T=0;T<S;T++)k+=`${S>1?`indicesIndices${b}[${T}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${T}]`:`outputIndices${b}`};`;k+=`
          var idx${b} = ${m.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${g.type.indices};
        `;for(let T=0,C=0;T<n;T++)T===a?(k+=`${n>1?`dataIndices${b}[${T}]`:`dataIndices${b}`} = u32(idx${b});`,C+=S):(k+=`${n>1?`dataIndices${b}[${T}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${C}]`:`outputIndices${b}`};`,C++);return k},v;if(e[0].dataType===9){let b=(S,k,T="")=>`
          let outputIndices${k} = ${_.offsetToIndices(`outputOffset + ${k}u`)};
          ${x(k)};
          let offset${k} = ${g.indicesToOffset(`dataIndices${k}`)};
          let index${k} = offset${k} / 4u;
          let component${k} = offset${k} % 4u;
          ${S}[${k}] = ${T}(${g.getByOffset(`index${k}`)}[component${k}]);
        `;v=`
        let outputOffset = global_idx * ${u};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${_.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${_.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${g.getByIndices("dataIndices")};
      ${_.setByOffset("global_idx","value")};
      `;return`
      ${h.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(g,m,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:f}},yf=e=>fe({axis:e.axis}),_f=(e,t)=>{let r=e.inputs;hl(r),e.compute(ml(e.inputs,t))}}),gl,bf,wf,P0=P(()=>{"use strict";ee(),ae(),se(),gl=(e,t,r,i,n,a,s,o,u)=>{let d=[{type:12,data:a},{type:12,data:i},{type:12,data:n},{type:12,data:r},{type:12,data:s},{type:12,data:o},{type:12,data:u}],c=[a];d.push(...Y(t.dims,c));let f=h=>{let g=R("indices_data",t.dataType,t.dims.length),m=H("input_slice_offsets_data",12,1,1),_=[g,m],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:n.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${h.registerUniforms(x).declareVariables(..._)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${n.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${n.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},bf=(e,t)=>{let r=e.inputs,i=r[0].dims,n=r[0].dataType,a=r[1].dims,s=a[a.length-1],o=A.sizeToDimension(a,a.length-1),u=A.sizeFromDimension(i,t.batchDims+s),d=A.sizeToDimension(i,t.batchDims),c=A.sizeFromDimension(i,t.batchDims),f=o/d,h=new Array(s),g=u;for(let k=0;k<s;++k)h[s-1-k]=g,g*=i[t.batchDims+s-1-k];let m=gl(e,r[1],h,t.batchDims,i,o,f,c,s),_=t.batchDims+s;if(_>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=a.slice(0,-1).concat(i.slice(_)),v=A.size(x),b=[{type:12,data:v},{type:12,data:u},...Y(r[0].dims,m.dims,x)],S=k=>{let T=R("data",r[0].dataType,r[0].dims.length),C=R("slice_offsets",12,m.dims.length),E=H("output",r[0].dataType,x.length);return`
          ${k.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(T,C,E)}
            ${k.mainStart()}
            ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:n}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:b}),getShaderSource:S},{inputs:[r[0],m]})},wf=e=>({batchDims:e.batch_dims,cacheKey:""})}),yl,_l,vf,$f,L0=P(()=>{"use strict";ee(),ae(),ve(),se(),yl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,n=e[0],a=e[2],s=e.length===4?e[3]:void 0;if(a.dims.length!==n.dims.length||!n.dims.map((o,u)=>u===r?Math.ceil(o/i)===a.dims[u]:o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==n.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==a.dims.length||!s.dims.map((o,u)=>o===a.dims[u]).reduce((o,u)=>o&&u,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},_l=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r.length,a=A.normalizeAxis(t.gatherAxis,n),s=A.normalizeAxis(t.quantizeAxis,n),o=r.slice(0);o.splice(a,1,...i);let u=A.size(o),d=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:u},{type:12,data:s},{type:12,data:a},{type:12,data:t.blockSize},...Y(...e.map((g,m)=>g.dims),o)],h=g=>{let m=R("data",e[0].dataType,e[0].dims.length),_=R("inputIndices",e[1].dataType,e[1].dims.length),x=R("scales",e[2].dataType,e[2].dims.length),v=e.length>3?R("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=H("output",d,o.length),S=[m,_,x];v&&S.push(v);let k=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${g.registerUniforms(k).declareVariables(...S,b)}
        ${g.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${_.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${_.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${m.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${m.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${_.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[a]};
        }
        ${m.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${o.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${m.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${m.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${m.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((g,m)=>m!==1).map(g=>g.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(g,m)=>"rank")},getRunData:()=>({outputs:[{dims:o,dataType:d}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:h}},vf=(e,t)=>{let r=e.inputs;yl(r,t),e.compute(_l(e.inputs,t))},$f=e=>fe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),bl,wl,xf,kf,U0=P(()=>{"use strict";ee(),ae(),ve(),se(),bl=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},wl=(e,t)=>{let r=e[0].dims,i=e[0].dataType,n=r.length,a=e[1].dims,s=e[1].dataType,o=A.normalizeAxis(t.axis,n),u=r[o],d=a.slice(0),c=A.size(d),f=R("input",i,n),h=R("indicesInput",s,a.length),g=H("output",i,d.length),m=[{type:12,data:c},{type:6,data:u},{type:12,data:o}];return m.push(...Y(r,a,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:m}),getShaderSource:_=>`
      ${_.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,h,g)}
      ${_.mainStart()}
      ${_.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${h.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}},xf=e=>fe({axis:e.axis}),kf=(e,t)=>{let r=e.inputs;bl(r),e.compute(wl(e.inputs,t))}}),vl,$l,Sf,Tf,W0=P(()=>{"use strict";ee(),ae(),se(),vl=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},$l=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[n,a,s]=$p.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),o=[n,a];if(!o)throw new Error("Can't use gemm on the given tensors");let u=16,d=Math.ceil(a/u),c=Math.ceil(n/u),f=!0,h=A.size(o),g=[{type:12,data:f?d:h},{type:12,data:n},{type:12,data:a},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],m=["type","type"];e.length===3&&(g.push(...Y(e[2].dims)),m.push("rank")),g.push(...Y(o));let _=v=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",k=R("a",e[0].dataType,e[0].dims),T=R("b",e[1].dataType,e[1].dims),C=k.type.value,E=null,z=[k,T];e.length===3&&(E=R("c",e[2].dataType,e[2].dims.length),z.push(E));let N=H("output",e[0].dataType,o.length);z.push(N);let q=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(q).declareVariables(...z)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${C}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${S}
    ${E!=null?`let cOffset = ${E.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${C}(uniforms.beta) * ${E.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let b=R("a",e[0].dataType,e[0].dims),S=R("b",e[1].dataType,e[1].dims),k=null,T=[b,S];e.length===3&&(k=R("c",e[2].dataType,e[2].dims.length),T.push(k));let C=H("output",e[0].dataType,o.length);T.push(C);let E=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],z="",N="";t.transA&&t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,z="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,z="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let q=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(E).declareVariables(...T)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${u}>, ${u}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${u}>, ${u}>;
  ${v.mainStart([u,u,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${u};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${u};
    let num_tiles = (uniforms.K - 1) / ${u} + 1;
    var k_start = 0u;
    var value = ${C.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${N}
      k_start = k_start + ${u};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${u}; k++) {
        ${z}
      }
      workgroupBarrier();
    }

    ${q}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${k!=null?`let cOffset = ${k.broadcastedIndicesToOffset("vec2(m, n)",C)}; value += ${C.type.value}(uniforms.beta) * ${k.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:g}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:o,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:g}),getShaderSource:_}},Sf=e=>{let t=e.transA,r=e.transB,i=e.alpha,n=e.beta;return{transA:t,transB:r,alpha:i,beta:n,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Tf=(e,t)=>{vl(e.inputs),e.compute($l(e.inputs,t))}}),ot,ft,Mt,Rt,xl,kl,Sl,Tl,Il,Cl,El,Al,If,Cf,q0=P(()=>{"use strict";ee(),ae(),ve(),se(),[ot,ft,Mt,Rt]=[0,1,2,3],xl=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},kl=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Sl=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Tl=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Il=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Cl=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${ot}] = batch;
     indices[${ft}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${Mt}] = u32(r);
            indices[${Rt}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${Mt}] = u32(clamp(r, 0, H - 1));
          indices[${Rt}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${Mt}] = gs_reflect(r, border[1], border[3]);
          indices[${Rt}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,El=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${ot}], indices[${ft}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${ot}], indices[${ft}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${ot}], indices[${ft}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${ot}], indices[${ft}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Al=(e,t)=>{let r=R("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],n=R("grid",e[1].dataType,i.length,2),a=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(a=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[ot,ft,Mt,Rt]=[0,3,1,2]);let s=H("output",e[0].dataType,a.length),o=r.type.value,u=A.size(a),d=[{type:12,data:u},...Y(e[0].dims,i,a)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,n,s)}
  ${kl}
  ${Sl(o)}
  ${Tl(t)}
  ${Il(t)}
  ${Cl(r,o,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${Mt}]);
      let W_in = i32(uniforms.x_shape[${Rt}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${ot}], indices[${Mt}], indices[${Rt}]);
      let nxy = ${n.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${El(s,o,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let h=A.size(a);return{outputs:[{dims:a,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:d}},getShaderSource:c}},If=(e,t)=>{xl(e.inputs),e.compute(Al(e.inputs,t))},Cf=e=>fe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Re,zl,Ef,zn,Ol,kr,Af,zf=P(()=>{"use strict";ee(),ae(),ve(),Sa(),Ca(),se(),Ct(),Re=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,zl=(e,t)=>{let r=e[0],i=Re(e,1),n=Re(e,2),a=Re(e,3),s=Re(e,4),o=Re(e,5),u=Re(e,6),d=Re(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],h=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],g=f,m=0,_=0,x=Math.floor(h/t.numHeads);if(u&&d&&A.size(u.dims)&&A.size(d.dims)){if(u.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(u.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=u.dims[2],_=u.dims[2]}else if(u&&A.size(u.dims)||d&&A.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&A.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,g=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,g=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,g=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(a&&A.size(a.dims)>0){if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=m+g,S=0;if(s&&A.size(s.dims)>0){S=8;let E=s.dims;throw E.length===1?E[0]===c?S=1:E[0]===3*c+2&&(S=3):E.length===2&&E[0]===c&&E[1]===b&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let k=!1,T=h;if(n&&A.size(n.dims)>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(g!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=n.dims[2]}else{if(g!==n.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');T=n.dims[1]*n.dims[3],k=!0}}let C=!1;if(s&&A.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(o&&A.size(o.dims)>0){if(o.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(o.dims[0]!==c||o.dims[1]!==t.numHeads||o.dims[2]!==f||o.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:m,kvSequenceLength:g,totalSequenceLength:b,maxSequenceLength:_,inputHiddenSize:0,hiddenSize:h,vHiddenSize:T,headSize:x,vHeadSize:Math.floor(T/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:C,passPastInKv:k,qkvFormat:v}},Ef=e=>fe({...e}),zn=fe({perm:[0,2,1,3]}),Ol=(e,t,r,i,n,a,s)=>{let o=[i,n,a],u=A.size(o),d=[{type:12,data:u},{type:12,data:s},{type:12,data:a}],c=f=>{let h=H("qkv_with_bias",t.dataType,o),g=R("qkv",t.dataType,o),m=R("bias",r.dataType,o),_=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms(_).declareVariables(g,m,h)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:o,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},kr=(e,t,r,i,n,a,s,o)=>{let u=a;if(s&&A.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return u=Ol(e,a,s,t,i,r*n,o),u=u.reshape([t,i,r,n]),r===1||i===1?u:e.compute(qe(u,zn.perm),{inputs:[u],outputs:[-1]})[0]}else return a.dims.length===3&&(u=a.reshape([t,i,r,n])),r===1||i===1?u:e.compute(qe(u,zn.perm),{inputs:[u],outputs:[-1]})[0]},Af=(e,t)=>{let r=zl(e.inputs,t),i=e.inputs[0],n=Re(e.inputs,1),a=Re(e.inputs,2),s=Re(e.inputs,3),o=Re(e.inputs,4),u=Re(e.inputs,5),d=Re(e.inputs,6),c=Re(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(n?.dims.length===5)throw new Error("Packed KV is not implemented");let f=n&&a&&n.dims.length===4&&a.dims.length===4,h=kr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(f)return Ir(e,h,n,a,o,void 0,d,c,u,r);if(!n||!a)throw new Error("key and value must be provided");let g=kr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,n,s,r.hiddenSize),m=kr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,a,s,2*r.hiddenSize);Ir(e,h,g,m,o,void 0,d,c,u,r)}}),Ml,Rl,Bl,Nl,pa,Of,Mf,Rf=P(()=>{"use strict";ee(),ae(),ve(),se(),Ml=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Rl=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(n=>r.push(Number(n))),i=r.length),fe({numOutputs:i,axis:t.axis,splitSizes:r})},Bl=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${G("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Nl=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let n=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(n):i===0?r.push(`if (output_number == ${i}u) { ${n} }`):i===t-1?r.push(`else { ${n} }`):r.push(`else if (output_number == ${i}) { ${n} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},pa=(e,t)=>{let r=e[0].dims,i=A.size(r),n=e[0].dataType,a=A.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),o=R("input",n,r.length),u=new Array(t.numOutputs),d=[],c=[],f=0,h=[{type:12,data:i}];for(let m=0;m<t.numOutputs;m++){f+=t.splitSizes[m],u[m]=f;let _=r.slice();_[a]=t.splitSizes[m],c.push(_),s[m]=H(`output${m}`,n,_.length),d.push({dims:c[m],dataType:e[0].dataType})}h.push({type:12,data:u},...Y(r,...c));let g=m=>`
  ${m.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",u.length).declareVariables(o,...s)}
  ${Bl(u.length)}
  ${Nl(s)}

  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${o.offsetToIndices("global_idx")};
    var index = ${o.indicesGet("indices",a)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${G("uniforms.size_in_split_axis","output_number - 1u",u.length)};
      ${o.indicesSet("indices",a,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:g,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:h})}},Of=(e,t)=>{Ml(e.inputs);let r=e.inputs.length===1?t:Rl(e.inputs,t);e.compute(pa(e.inputs,r),{inputs:[0]})},Mf=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return fe({axis:t,numOutputs:i,splitSizes:r})}}),Dl,ci,Bf,Nf=P(()=>{"use strict";ee(),ae(),ve(),se(),Dl=(e,t)=>{let[r,i,n,a]=e,{numHeads:s,rotaryEmbeddingDim:o}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!A.areEqual(i.dims,[])&&!A.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(!A.areEqual(n.dims,a.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(o>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let u=r.dims[0],d=r.dims[r.dims.length-2],c=n.dims[0],f=A.sizeFromDimension(r.dims,1)/d,h=o===0?n.dims[1]*2:f/s;if(o>h)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(u!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(h/2!==n.dims[1]&&o/2!==n.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${n.dims[1]}`);if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},ci=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:n,scale:a}=t,s=e[0].dims[0],o=A.sizeFromDimension(e[0].dims,1),u=e[0].dims[e[0].dims.length-2],d=o/u,c=e[2].dims[1],f=n===0?c*2:d/i,h=new Array(s,u,d/f,f-c),g=A.computeStrides(h),m=[{type:1,data:a},{type:12,data:h},{type:12,data:g},...e[0].dims.length===3?new Array({type:12,data:[o,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[o,f,u*f,1]}):[],...Y(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],_=x=>{let v=R("input",e[0].dataType,e[0].dims.length),b=R("position_ids",e[1].dataType,e[1].dims.length),S=R("cos_cache",e[2].dataType,e[2].dims.length),k=R("sin_cache",e[3].dataType,e[3].dims.length),T=H("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:g.length},{name:"input_output_strides",type:"u32",length:g.length}]),`
        ${x.declareVariables(v,b,S,k,T)}

        ${x.mainStart(er)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",H("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${T.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${T.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${T.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:fe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:_,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(h)/er)},programUniforms:m})}},Bf=(e,t)=>{Dl(e.inputs,t),e.compute(ci(e.inputs,t))}}),Pl,Ll,On,Ul,Df,F0=P(()=>{"use strict";ve(),ee(),Ca(),zf(),Rf(),Ct(),Nf(),se(),Pl=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],n=e[2],a=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let o=!1,u=r.dims[0],d=r.dims[1],c=r.dims.length===3?o?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=d,h=0,g=!i||i.dims.length===0,m=Math.floor(g?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);g&&(c=m*t.numHeads);let _=a&&a.dims.length!==0,x=s&&s.dims.length!==0;if(_&&a.dims.length===4&&a.dims[0]===u&&a.dims[1]!==t.kvNumHeads&&a.dims[2]===t.kvNumHeads&&a.dims[3]===m)throw new Error("BSNH pastKey/pastValue is not supported");if(_&&x){if(a.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');h=a.dims[2]}else if(_||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==m)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==m)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let b=0,S=!1,k=t.kvNumHeads?m*t.kvNumHeads:c;if(n&&n.dims.length>0){if(n.dims.length!==3&&n.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==n.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(n.dims.length===3){if(f!==n.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=n.dims[2]}else{if(f!==n.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');k=n.dims[1]*n.dims[3],S=!0}}let T=e.length>4?e[5]:void 0;if(T&&T.dims.length!==1&&T.dims[0]!==u)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:u,sequenceLength:d,pastSequenceLength:h,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:k,headSize:m,vHeadSize:Math.floor(k/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:v}},Ll=fe({perm:[0,2,1,3]}),On=(e,t,r)=>{let i=t,n=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,n,r.headSize]),i=e.compute(qe(i,Ll.perm),{inputs:[i],outputs:[-1]})[0]),i},Ul=(e,t,r,i)=>{let n=7,a=["type","type"],s=[e*t],o=e*t,u=[{type:12,data:o},{type:12,data:t},{type:12,data:e}],d=c=>{let f=R("seq_lens",r.dataType,r.dims),h=R("total_seq_lens",i.dataType,i.dims),g=H("pos_ids",n,s),m=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(m).declareVariables(f,h,g)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${h.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${g.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${g.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:a},getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:u}),getShaderSource:d}},Df=(e,t)=>{let r=Pl(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],n=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,a=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,o=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,u=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=fe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[h,g,m]=!n&&!a?e.compute(pa([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,n,a],_,x;if(t.doRotary){let k=e.compute(Ul(r.batchSize,r.sequenceLength,u,d),{inputs:[u,d],outputs:[-1]})[0],T=e.inputs[7],C=e.inputs[8],E=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),z=[h,k,T,C],N=[-1];_=e.compute(ci(z,E),{inputs:z,outputs:N})[0],z.splice(0,1,g);let q=fe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(ci(z,q),{inputs:z,outputs:N})[0]}let v=kr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?_:h,void 0,0),b=On(e,t.doRotary?x:g,r),S=On(e,m,r);Ir(e,v,b,S,void 0,void 0,s,o,void 0,r,u,d)}}),Mn,Wl,ql,Pf,H0=P(()=>{"use strict";ee(),ae(),Ct(),se(),Mn=(e,t,r,i,n,a,s,o)=>{let u=we(a),d=u===1?"f32":`vec${u}f`,c=u===1?"vec2f":`mat2x${u}f`,f=n*s,h=64;f===1&&(h=256);let g=[n,s,a/u],m=[n,s,2],_=["rank","type","type"],x=[];x.push(...Y(g,m));let v=b=>{let S=R("x",t.dataType,3,u),k=R("scale",r.dataType,r.dims),T=R("bias",i.dataType,i.dims),C=H("output",1,3,2),E=[S,k,T,C];return`
  var<workgroup> workgroup_shared : array<${c}, ${h}>;
  const workgroup_size = ${h}u;
  ${b.declareVariables(...E)}
  ${b.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${It("workgroup_shared[0][0]",u)} / f32(hight * ${u});
      let squared_sum_final = ${It("workgroup_shared[0][1]",u)} / f32(hight * ${u});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${o}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${u};${o};${h}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},Wl=(e,t,r)=>{let i=t[0].dims,n=i,a=2,s=i[0],o=i[1],u=A.sizeFromDimension(i,a),d=we(u),c=A.size(n)/d,f=Mn(e,t[0],t[1],t[2],s,u,o,r.epsilon),h=[s,o,u/d],g=[s,o],m=["type","none"],_=x=>{let v=R("x",t[0].dataType,h.length,d),b=R("scale_shift",1,g.length,2),S=H("output",t[0].dataType,h.length,d),k=[v,b,S];return`
  ${x.registerUniform("output_size","u32").declareVariables(...k)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:m},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Y(h,g,h)]}),getShaderSource:_},{inputs:[t[0],f]})},ql=(e,t,r)=>{let i=t[0].dims,n=i,a=i[0],s=i[i.length-1],o=A.sizeFromDimension(i,1)/s,u=we(s),d=A.size(n)/u,c=[{type:12,data:o},{type:12,data:Math.floor(s/u)}],f=["type","type"],h=!1,g=[0,i.length-1];for(let v=0;v<i.length-2;v++)h=h||i[v+1]!==1,g.push(v+1);h=h&&i[i.length-1]!==1;let m=h?e.compute(qe(e.inputs[0],g),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,b)=>i[g[b]])),_=Mn(e,m,t[1],t[2],a,o,s,r.epsilon),x=v=>{let b=Se(t[0].dataType),S=u===1?"vec2f":`mat${u}x2f`,k=E=>{let z=E===0?"x":"y",N=u===1?"f32":`vec${u}f`;switch(u){case 1:return`${b}(${N}(scale.${z}))`;case 2:return`vec2<${b}>(${N}(scale[0].${z}, scale[1].${z}))`;case 4:return`vec4<${b}>(${N}(scale[0].${z}, scale[1].${z}, scale[2].${z}, scale[3].${z}))`;default:throw new Error(`Not supported compoents ${u}`)}},T=R("input",t[0].dataType,t[0].dims,u),C=H("output",t[0].dataType,n,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${C.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${k(0)}, ${k(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:n,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:x},{inputs:[t[0],_]})},Pf=(e,t)=>{t.format==="NHWC"?ql(e,e.inputs,t):Wl(e,e.inputs,t)}}),Fl,Hl,Lf,V0=P(()=>{"use strict";ee(),ae(),se(),Fl=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Hl=(e,t,r)=>{let i=t.simplified,n=e[0].dims,a=e[1],s=!i&&e[2],o=n,u=A.normalizeAxis(t.axis,n.length),d=A.sizeToDimension(n,u),c=A.sizeFromDimension(n,u),f=A.size(a.dims),h=s?A.size(s.dims):0;if(f!==c||s&&h!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${h}`);let g=[];for(let T=0;T<n.length;++T)T<u?g.push(n[T]):g.push(1);let m=we(c),_=["type","type"],x=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/m)},{type:1,data:t.epsilon}];s&&_.push("type");let v=r>1,b=r>2,S=T=>{let C=Se(e[0].dataType),E=[R("x",e[0].dataType,e[0].dims,m),R("scale",a.dataType,a.dims,m)];s&&E.push(R("bias",s.dataType,s.dims,m)),E.push(H("output",e[0].dataType,o,m)),v&&E.push(H("mean_data_output",1,g)),b&&E.push(H("inv_std_output",1,g));let z=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${T.registerUniforms(z).declareVariables(...E)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${ra("f32",m)};
    var mean_square_vector = ${ra("f32",m)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Qt(C,m,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${It("mean_vector",m)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${It("mean_square_vector",m)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Qt(C,m,"x[j + offset]")};
      let f32scale = ${Qt(C,m,"scale[j]")};
      output[j + offset] = ${E[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Qt(C,m,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},k=[{dims:o,dataType:e[0].dataType}];return v&&k.push({dims:g,dataType:1}),b&&k.push({dims:g,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${m};${r};${i}`,inputDependencies:_},getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:x}),getShaderSource:S}},Lf=(e,t)=>{Fl(e.inputs),e.compute(Hl(e.inputs,t,e.outputCount))}}),Vl,Uf,G0=P(()=>{"use strict";ae(),Ma(),Ra(),Vl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Uf=e=>{Vl(e.inputs);let t=Jt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Oa(e.inputs,{activation:""},t));else{let n=t[t.length-2],a=A.size(e.inputs[0].dims.slice(0,-2)),s=A.size(e.inputs[1].dims.slice(0,-2));if(a!==1&&n===1&&s===1){let o=e.inputs[0].reshape([1,a,i]),u=e.inputs[1].reshape([1,i,r]),d=[1,a,r],c=[o,u];e.compute(pi(c,{activation:""},t,d),{inputs:c})}else e.compute(pi(e.inputs,{activation:""},t))}}}),Gl,jl,Kl,Wf,qf,j0=P(()=>{"use strict";ee(),ae(),ve(),se(),Gl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let n=Math.floor((t.k+t.blockSize-1)/t.blockSize),a=t.blockSize/8*t.bits,s=e[1];if(!A.areEqual(s.dims,[t.n,n,a]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let o=e[2].dims;if(A.size(o)!==t.n*n)throw new Error("scales input size error.");if(e.length===4){let u=e[3].dims,d=t.bits>4?t.n*n:t.n*Math.floor((n+1)/2);if(A.size(u)!==d)throw new Error("zeroPoints input size error.")}},jl=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),u=A.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=we(t.k),h=we(d),g=we(s),m=o.concat([n,s]),_=n>1&&s/g%2===0?2:1,x=A.size(m)/g/_,v=64,b=[],S=[u,n,a/f],k=A.convertShape(e[1].dims).slice();k.splice(-1,1,d/h),b.push(...Y(S)),b.push(...Y(k)),b.push(...Y(e[2].dims)),e.length===4&&b.push(...Y(A.convertShape(e[3].dims)));let T=[u,n,s/g];b.push(...Y(T));let C=E=>{let z=S.length,N=R("a",e[0].dataType,z,f),q=R("b",12,k.length,h),Q=R("scales",e[2].dataType,e[2].dims.length),V=[N,q,Q],te=e.length===4?R("zero_points",12,e[3].dims.length):void 0;te&&V.push(te);let L=T.length,ie=H("output",e[0].dataType,L,g),X=Se(e[0].dataType),F=(()=>{switch(f){case 1:return`array<${X}, 8>`;case 2:return`mat4x2<${X}>`;case 4:return`mat2x4<${X}>`;default:throw new Error(`${f}-component is not supported.`)}})(),ue=()=>{let B=`
          // reuse a data
            var input_offset = ${N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`)};
            var a_data: ${F};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${N.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let U=0;U<g*_;U++)B+=`
            b_value = ${h===1?`b${U}_data`:`b${U}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${F}(${Array.from({length:4},(re,O)=>`${X}(b_value_lower[${O}]), ${X}(b_value_upper[${O}])`).join(", ")});
            b_dequantized_values = ${f===1?`${F}(${Array.from({length:8},(re,O)=>`(b_quantized_values[${O}] - ${te?`zero_point${U}`:"zero_point"}) * scale${U}`).join(", ")});`:`(b_quantized_values - ${F}(${Array(8).fill(`${te?`zero_point${U}`:"zero_point"}`).join(",")})) * scale${U};`};
            workgroup_shared[local_id.x * ${_} + ${Math.floor(U/g)}]${g>1?`[${U%g}]`:""} += ${Array.from({length:8/f},(re,O)=>`${f===1?`a_data[${O}] * b_dequantized_values[${O}]`:`dot(a_data[${O}], b_dequantized_values[${O}])`}`).join(" + ")};
          `;return B},j=()=>{let B=`
            var col_index = col * ${g};
            ${te?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            `;for(let U=0;U<g*_;U++)B+=`
            let scale${U} = ${Q.getByOffset("col_index * nBlocksPerCol + block")};
            ${te?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${te.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${U} = ${X}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return B},le=()=>{let B=`col_index = col * ${g};`;for(let U=0;U<g*_;U++)B+=`
            let b${U}_data = ${q.getByIndices(`${q.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return B+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${F};
            var b_dequantized_values: ${F};`,B};return`
        var<workgroup> workgroup_shared: array<${ie.type.value}, ${_*v}>;
        ${E.declareVariables(...V,ie)}
        ${E.mainStart([v,1,1])}
          let output_indices = ${ie.offsetToIndices(`(global_idx / ${v}) * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${j()}
            for (var word: u32 = 0; word < ${d}; word += ${h}) {
              ${le()}
              for (var i: u32 = 0; i < ${h}; i++) {
                ${ue()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${_}) {
            var output_value: ${ie.type.value} = ${ie.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${_};
            }
            ${ie.setByIndices(`${ie.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${h};${g};${_};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:m,dataType:c}],dispatchGroup:{x},programUniforms:b}),getShaderSource:C}},Kl=(e,t)=>{let r=e[0].dims,i=r.length,n=r[i-2],a=t.k,s=t.n,o=r.slice(0,i-2),u=A.size(o),d=e[1].dims[2]/4,c=e[0].dataType,f=we(t.k),h=we(d),g=o.concat([n,s]),m=128,_=s%8===0?8:s%4===0?4:1,x=m/_,v=x*h*8,b=v/f,S=v/t.blockSize,k=A.size(g)/_,T=[],C=[u,n,a/f],E=A.convertShape(e[1].dims).slice();E.splice(-1,1,d/h),T.push(...Y(C)),T.push(...Y(E)),T.push(...Y(e[2].dims)),e.length===4&&T.push(...Y(A.convertShape(e[3].dims)));let z=[u,n,s];T.push(...Y(z));let N=q=>{let Q=C.length,V=R("a",e[0].dataType,Q,f),te=R("b",12,E.length,h),L=R("scales",e[2].dataType,e[2].dims.length),ie=[V,te,L],X=e.length===4?R("zero_points",12,e[3].dims.length):void 0;X&&ie.push(X);let F=z.length,ue=H("output",e[0].dataType,F),j=Se(e[0].dataType),le=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${j}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${j}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${V.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${ue.type.value}, ${x}>, ${_}>;
        ${q.declareVariables(...ie,ue)}
        ${q.mainStart([x,_,1])}
          let output_indices = ${ue.offsetToIndices(`workgroup_index * ${_}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${m})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${V.getByIndices(`${V.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${V.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${X?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${X.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${j}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${j}(8);`}
            let scale = ${L.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${te.getByIndices(`${te.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${h}; i++) {
              ${le()}
              let b_value = ${h===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${j}>(${Array.from({length:4},(B,U)=>`${j}(b_value_lower[${U}]), ${j}(b_value_upper[${U}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${j}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(B,U)=>`${`dot(a_data${U}, b_dequantized_values[${U}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${_}) {
            var output_value: ${ue.type.value} = ${ue.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ue.setByIndices(`${ue.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${h};${x};${_}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x:k},programUniforms:T}),getShaderSource:N}},Wf=(e,t)=>{Gl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(Kl(e.inputs,t)):e.compute(jl(e.inputs,t))},qf=e=>fe(e)}),Yl,Xl,Zl,Ql,Jl,ed,td,rd,Ff,K0=P(()=>{"use strict";ee(),ae(),se(),Yl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},Xl=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
            k = i32(${e.indicesGet("indices",n)}) - ${G("uniforms.pads",n,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${G("uniforms.x_shape",n,t)})) {
              break;
            }
            offset += k * i32(${G("uniforms.x_strides",n,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},Zl=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${G("uniforms.pads",n,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${G("uniforms.x_shape",n,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${G("uniforms.x_shape",n,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${G("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Ql=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${G("uniforms.pads",n,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${G("uniforms.x_shape",n,t)})) {
                  k = i32(${G("uniforms.x_shape",n,t)}) - 1;
                }
                offset += k * i32(${G("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},Jl=(e,t,r)=>{let i="";for(let n=t-1;n>=0;--n)i+=`
                k = i32(${e.indicesGet("indices",n)}) - ${G("uniforms.pads",n,r)};
                if (k < 0)  {
                  k += i32(${G("uniforms.x_shape",n,t)}]);
                }
                if (k >= i32(${G("uniforms.x_shape",n,t)})) {
                  k -= i32(${G("uniforms.x_shape",n,t)});
                }
                offset += k * i32(${G("uniforms.x_strides",n,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ed=(e,t,r)=>{switch(r.mode){case 0:return Xl(e,t,r.pads.length);case 1:return Zl(e,t,r.pads.length);case 2:return Ql(e,t,r.pads.length);case 3:return Jl(e,t,r.pads.length);default:throw new Error("Invalid mode")}},td=(e,t)=>{let r=A.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,n=A.size(r),a=[{type:12,data:n},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&a.push({type:s?e[2].dataType:1,data:t.value}),a.push(...Y(e[0].dims,r));let o=["rank"],u=d=>{let c=H("output",e[0].dataType,r.length),f=R("x",e[0].dataType,i.length),h=f.type.value,g=ed(c,i.length,t),m=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&m.push({name:"constant_value",type:s?h:"f32"}),`
            ${d.registerUniforms(m).declareVariables(f,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${h}(0);
            ${g}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:o},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(r)/64)},programUniforms:a}),getShaderSource:u}},rd=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,n=e[0].dims.length,a=new Int32Array(2*n).fill(0);if(e.length>=4){let o=e[3].getBigInt64Array();for(let u=0;u<o.length;u++)a[Number(o[u])]=Number(r[u]),a[Number(o[u])+n]=Number(r[u+o.length])}else r.forEach((o,u)=>a[Number(u)]=Number(o));let s=[];return a.forEach(o=>s.push(o)),{mode:t.mode,value:i,pads:s}}else return t},Ff=(e,t)=>{Yl(e.inputs);let r=rd(e.inputs,t);e.compute(td(e.inputs,r),{inputs:[0]})}}),yr,Rn,Bn,Nn,Dn,id,nd,Pn,Ln,Hf,Vf,Un,Gf,jf,Wn,Kf,Yf,Xf,Zf,Y0=P(()=>{"use strict";tt(),ee(),ae(),se(),yr=e=>{if(ye.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Rn=(e,t,r)=>{let i=t.format==="NHWC",n=e.dims.slice();i&&n.splice(1,0,n.pop());let a=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),o=t.strides.slice(),u=a?t.dilations.slice():[],d=t.pads.slice();li.adjustPoolAttributes(r,n,s,o,u,d);let c=li.computePoolOutputShape(r,n,o,u,s,d,t.autoPad),f=Object.assign({},t);a?Object.assign(f,{kernelShape:s,strides:o,pads:d,dilations:u,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:o,pads:d,cacheKey:t.cacheKey});let h=c.slice();return h.push(h.splice(1,1)[0]),[f,i?h:c]},Bn=(e,t)=>{let r=t.format==="NHWC",i=A.size(e),n=A.size(t.kernelShape),a=[{type:12,data:i},{type:12,data:n}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let o=t.kernelShape[t.kernelShape.length-1],u=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(d+c);a.push({type:12,data:o},{type:12,data:u},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let h=!1;if(t.kernelShape.length===2){let g=t.kernelShape[t.kernelShape.length-2],m=t.strides[t.strides.length-2],_=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];h=!!(_+x),a.push({type:12,data:g},{type:12,data:m},{type:12,data:_},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,f,h]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let o=A.computeStrides(t.kernelShape);a.push({type:12,data:o},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:o.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let u=t.pads.reduce((d,c)=>d+c);return[a,s,!!u,!1,!1]}},Nn=(e,t,r,i,n,a,s,o,u,d,c,f)=>{let h=n.format==="NHWC",g=t.type.value,m=H("output",t.type.tensor,i);if(n.kernelShape.length<=2){let _="",x="",v="",b=r-(h?2:1);if(c?_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`:_=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${a}
                }`,n.kernelShape.length===2){let S=r-(h?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${g}(${o});
              var pad = 0;
              ${x}
              ${_}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(h)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let _=n.kernelShape.length,x=n.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${a}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${a}
            `,`
            ${e.registerUniforms(u).declareVariables(t,m)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${_}>;

              var value = ${g}(${o});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${_-1}u; j++) {
                  offsets[j] = offset / ${G("uniforms.kernelStrides","j",_)};
                  offset -= offsets[j] * ${G("uniforms.kernelStrides","j",_)};
                }
                offsets[${_-1}] = offset;

                isPad = false;
                for (var j = ${r-_}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${G("uniforms.strides",`j - ${r-_}u`,_)}
                    + offsets[j - ${r-_}u] - ${G("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},Dn=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,id=e=>`${Dn(e)};${e.countIncludePad}`,nd=e=>`${Dn(e)};${e.storageOrder};${e.dilations}`,Pn=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),Ln=(e,t,r,i)=>{let[n,a]=Rn(t,i,r),s=R("x",t.dataType,t.dims.length),o=s.type.value,u="value += x_val;",d="";n.countIncludePad?d+=`value /= ${o}(uniforms.kernelSize);`:d+=`value /= ${o}(i32(uniforms.kernelSize) - pad);`;let[c,f,h,g,m]=Bn(a,n);c.push(...Y(t.dims,a));let _=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${h};${g};${m}`,inputDependencies:_},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(a)/64)},programUniforms:c}),getShaderSource:x=>Nn(x,s,t.dims.length,a.length,n,u,d,0,f,h,g,m)}},Hf=e=>{let t=e.count_include_pad!==0,r=Pn(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:id(i)}},Vf=(e,t)=>{yr(e.inputs),e.compute(Ln("AveragePool",e.inputs[0],!1,t))},Un={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},Gf=e=>{let t=e.format;return{format:t,...Un,cacheKey:t}},jf=(e,t)=>{yr(e.inputs),e.compute(Ln("GlobalAveragePool",e.inputs[0],!0,t))},Wn=(e,t,r,i)=>{let[n,a]=Rn(t,i,r),s=`
      value = max(x_val, value);
    `,o="",u=R("x",t.dataType,t.dims.length),d=["rank"],[c,f,h,g,m]=Bn(a,n);return c.push(...Y(t.dims,a)),{name:e,shaderCache:{hint:`${i.cacheKey};${h};${g};${m}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:a,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(a)/64)},programUniforms:c}),getShaderSource:_=>Nn(_,u,t.dims.length,a.length,n,s,o,t.dataType===10?-65504:-1e5,f,h,g,m)}},Kf=(e,t)=>{yr(e.inputs),e.compute(Wn("MaxPool",e.inputs[0],!1,t))},Yf=e=>{let t=e.storage_order,r=e.dilations,i=Pn(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:t,dilations:r,...i,cacheKey:""};return{...n,cacheKey:nd(n)}},Xf=e=>{let t=e.format;return{format:t,...Un,cacheKey:t}},Zf=(e,t)=>{yr(e.inputs),e.compute(Wn("GlobalMaxPool",e.inputs[0],!0,t))}}),ad,sd,Qf,Jf,X0=P(()=>{"use strict";ee(),ae(),ve(),se(),ad=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((n,a)=>a===t.axis||n===e[0].dims[a]).reduce((n,a)=>n&&a,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},sd=(e,t)=>{let r=A.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,n=i===3,a=e[0].dims,s=e[1].dataType,o=A.size(a),u=i===3||i===2,d=u?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,h=f?u?[Math.ceil(A.size(f.dims)/4)]:f.dims:void 0,g=c.length===0||c.length===1&&c[0]===1,m=g===!1&&c.length===1,_=we(o),x=g&&(!u||_===4),v=x?_:1,b=x&&!u?_:1,S=R("input",u?12:i,d.length,b),k=R("scale",s,c.length),T=f?R("zero_point",u?12:i,h.length):void 0,C=H("output",s,a.length,v),E=[S,k];T&&E.push(T);let z=[d,c];f&&z.push(h);let N=[{type:12,data:o/v},{type:12,data:r},{type:12,data:t.blockSize},...Y(...z,a)],q=Q=>{let V=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Q.registerUniforms(V).declareVariables(...E,C)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${C.offsetToIndices("global_idx")};

          // Set input x
          ${u?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${n?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${k.getByOffset("0")}`:m?`
            let scale_index = ${C.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${k.getByOffset("scale_index")};`:`
            var scale_indices: ${k.type.indices} = output_indices;
            let index = ${k.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${k.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${k.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${T?g?u?`
                let zero_point_input = ${T.getByOffset("0")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${T.getByOffset("0")}`:m?u?`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${T.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${C.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${T.getByOffset("zero_point_index")};`:u?`
                let zero_point_offset = ${k.indicesToOffset("scale_indices")};
                let zero_point_input = ${T.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${n?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${T.getByIndices("scale_indices")};`:`let zero_point_value = ${u?n?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${C.setByOffset("global_idx",`${C.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:T?["rank","rank","rank"]:["rank","rank"]},getShaderSource:q,getRunData:()=>({outputs:[{dims:a,dataType:s}],dispatchGroup:{x:Math.ceil(o/v/64),y:1,z:1},programUniforms:N})}},Qf=(e,t)=>{ad(e.inputs,t),e.compute(sd(e.inputs,t))},Jf=e=>fe({axis:e.axis,blockSize:e.blockSize})}),od,ud,eh,Z0=P(()=>{"use strict";tt(),ee(),se(),od=(e,t,r)=>{let i=e===t,n=e<t&&r<0,a=e>t&&r>0;if(i||n||a)throw new Error("Range these inputs' contents are invalid.")},ud=(e,t,r,i)=>{let n=Math.abs(Math.ceil((t-e)/r)),a=[n],s=n,o=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...Y(a)],u=d=>{let c=H("output",i,a.length),f=c.type.value,h=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(h).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:u,getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:o})}},eh=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),ye.webgpu.validateInputContent&&od(t,r,i),e.compute(ud(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),ld,qn,Fn,dd,th,rh,Q0=P(()=>{"use strict";ee(),ae(),ve(),se(),ld=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let n=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,a=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${n}bitcast<${i}>(oldValue) + (${r})${a}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${n}max(bitcast<f32>(oldValue), (${r}))${a}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${n}min(bitcast<${i}>(oldValue), (${r}))${a}`;case"mul":return`${n}(bitcast<${i}>(oldValue) * (${r}))${a}`;default:throw new Error(`Reduction ${e} is not supported.`)}},qn=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,Fn=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${ld(e.reduction,"output[data_offset + i]","value",t)}
      }`,dd=(e,t)=>{let r=e[0].dims,i=e[1].dims,n=r,a=1,s=Math.ceil(A.size(i)/a),o=i[i.length-1],u=A.sizeFromDimension(r,o),d=A.sizeFromDimension(i,0)/o,c=[{type:12,data:s},{type:12,data:o},{type:12,data:u},...Y(e[1].dims,e[2].dims,n)],f=h=>{let g=R("indices",e[1].dataType,e[1].dims.length),m=R("updates",e[2].dataType,e[2].dims.length,a),_=t.reduction!=="none"&&t.reduction!==""?Ep("output",e[0].dataType,n.length):H("output",e[0].dataType,n.length,a);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(g,m,_)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${d}; i = i + 1) {
      for (var j = i + 1; j < ${d}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${d}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${qn(r.length,!1)}
      }
      ${Fn(t,_.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${qn(r.length,!0)}
  }
  ${Fn(t,_.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:f}},th=e=>fe({reduction:e.reduction}),rh=(e,t)=>{e.compute(dd(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),pd,cd,fd,Hn,hd,md,gd,yd,_d,bd,wd,vd,Vn,$d,xd,kd,Sd,Td,ih,nh,J0=P(()=>{"use strict";ee(),ae(),ve(),se(),pd=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},cd=(e,t,r)=>{t.every(n=>n>=0&&n<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((n,a)=>i[n]=e[a]),i},fd=(e,t,r,i,n,a)=>{let[s,o,u]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>a.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(o>0&&e.length>o&&e[o].dims.length===1&&e[o].dims[0]>0){if(e[o].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");pd(i,t),t.axes.length>0&&cd(i,t.axes,d).forEach((c,f)=>i[f]=c)}if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0&&(e[u].getBigInt64Array().forEach(c=>n.push(Number(c))),n.length!==0&&n.length!==d&&r>=18&&n.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(n.length!==0&&n.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof n<"u"&&i.length>0&&n.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},Hn=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,hd=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${Hn("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${Hn("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",md=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",gd=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),n=e.length===0?i:e.slice();return t.length>0?(t.forEach((a,s)=>{i[a]=n[s],i[s+r]=n[t.length+s]}),i):n},yd=(e,t,r,i)=>{let n=[];if(r.length>0)if(i.length>0){if(e.forEach(a=>n.push(a)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((a,s)=>n[a]=r[s])}else r.forEach(a=>n.push(a));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");n=e.map((a,s)=>Math.round(a*t[s]))}return n},_d=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(a=>t[a]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(a=>t[a]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let n=e.slice();return r.axes.length>0?(r.axes.forEach(a=>t[a]=i),r.axes.forEach(a=>n[a]=Math.round(e[a]*t[a]))):(t.fill(i,0,t.length),n.forEach((a,s)=>n[s]=Math.round(a*t[s]))),n},bd=(e,t,r,i,n)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${G("uniforms.scales","i",i)};
        var roi_low = ${G("uniforms.roi","i",n)};
        var roi_hi = ${G("uniforms.roi",`i + ${t.length}`,n)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${G("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,wd=(e,t,r,i,n,a,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${G("uniforms.scales","i",n)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${G("uniforms.roi","i",a)};
          var roi_hi = ${G("uniforms.roi",`i + ${r.length}`,a)};
          var input_shape_i = ${G("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,vd=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${G("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,Vn=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",$d=(e,t,r,i,n)=>{let[a,s,o,u]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(col, ${r[o]} - 1))`)};
      ${Vn(e,u,a,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${o}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[o]} - 1)) {
        return ${n};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[o]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${u}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${a}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},xd=(e,t,r,i,n,a,s,o,u,d)=>{let c=r.length===2,f=!0,[h,g]=c?[0,1]:f?[2,3]:[1,2],m=e.type.value,_=x=>{let v=x===h?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${m} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${m} = getOriginalCoordinateFromResizedCoordinate(output_index, ${n[x]},
        ${i[x]}, ${r[x]}, ${a[x]}, ${a[x]} + ${r.length});
        var fractOriginalIdx: ${m} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${o} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${u};
        }
        var data: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${m} = originalIdx + ${m}(i);
          if (${v} < 0 || ${v} >= ${r[x]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:o?`return ${u};`:`${v} = max(0, min(${v}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===h?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${_(h)};
    ${_(g)};
  fn getCubicInterpolationCoefs(s: ${m}) -> array<${m}, 4> {
    var absS = abs(s);
    var coeffs: array<${m}, 4> = array<${m}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${m} = 1.0 - absS;
    var twoMinusAbsS: ${m} = 2.0 - absS;
    var onePlusAbsS: ${m} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${m}, 4>, coefs: array<${m}, 4>) -> ${m} {
    var coefsSum: ${m} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${m} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},kd=(e,t,r,i,n)=>{let[a,s,o,u,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",o,`max(0, min(height, ${r[o]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(width, ${r[u]} - 1))`)};
      ${Vn(e,d,a,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${o}];
      var width:${c} = originalIndices[${u}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[o]} - 1) || width < 0 || (width > ${r[u]} - 1)) {
      return ${n};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[o]} - 1));
      width = max(0, min(width, ${r[u]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${a}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Sd=(e,t,r,i,n,a)=>{let s=e.dims,o=gd(a,t.axes,s.length),u=yd(s,i,n,t.axes),d=i.slice();i.length===0&&(d=s.map((b,S)=>b===0?1:u[S]/b),t.keepAspectRatioPolicy!=="stretch"&&(u=_d(s,d,t)));let c=H("output",e.dataType,u.length),f=R("input",e.dataType,s.length),h=A.size(u),g=s.length===u.length&&s.every((b,S)=>b===u[S]),m=t.coordinateTransformMode==="tf_crop_and_resize",_=t.extrapolationValue,x=f.type.value,v=b=>`
      ${g?"":`
      ${hd(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${vd(f,s)};
              ${md(t.nearestMode,r,x)};
              ${wd(f,c,s,u,d.length,o.length,m)};
              `;case"linear":return`
              ${bd(c,s,u,d.length,o.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${$d(f,c,s,m,_)}`;if(s.length===3||s.length===5)return`${kd(f,c,s,m,_)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${xd(f,c,s,u,d,o,t.cubicCoeffA,m,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",o.length).declareVariables(f,c)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${g?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${n.length>0?n:""}|${o.length>0?o:""}|${g}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:u,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:[{type:12,data:h},{type:1,data:d},{type:1,data:o},...Y(s,u)]})}},Td=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ih=(e,t)=>{let r=[],i=[],n=[],a=Td(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");fd(e.inputs,t,a,r,i,n),e.compute(Sd(e.inputs[0],t,a,r,i,n),{inputs:[0]})},nh=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,n=e.cubicCoeffA,a=e.excludeOutside!==0,s=e.extrapolationValue,o=e.keepAspectRatioPolicy,u=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return fe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:n,excludeOutside:a,extrapolationValue:s,keepAspectRatioPolicy:o,mode:u,nearestMode:d})}}),Id,Cd,ah,ey=P(()=>{"use strict";ee(),ae(),se(),Id=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let n=t.dims[t.dims.length-1],a=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==n)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==a)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==n)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==n)throw new Error("Bias must have the same hidden size as input")}},Cd=(e,t,r,i)=>{let n=t.simplified,a=e[0].dims,s=A.size(a),o=a,u=s,d=a.slice(-1)[0],c=i?a.slice(0,-1).concat(1):[],f=!n&&e.length>3,h=e.length>4,g=i&&r>1,m=i&&r>2,_=r>3,x=64,v=we(d),b=[{type:12,data:u},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],S=T=>{let C=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],E=[R("x",e[0].dataType,e[0].dims,v),R("skip",e[1].dataType,e[1].dims,v),R("gamma",e[2].dataType,e[2].dims,v)];f&&E.push(R("beta",e[3].dataType,e[3].dims,v)),h&&E.push(R("bias",e[4].dataType,e[4].dims,v)),E.push(H("output",e[0].dataType,o,v)),g&&E.push(H("mean_output",1,c)),m&&E.push(H("inv_std_output",1,c)),_&&E.push(H("input_skip_bias_sum",e[0].dataType,o,v));let z=Se(e[0].dataType),N=Se(1,v);return`

      ${T.registerUniforms(C).declareVariables(...E)}
      var<workgroup> sum_shared : array<${N}, ${x}>;
      var<workgroup> sum_squared_shared : array<${N}, ${x}>;

      ${T.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":z+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${_?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Qt(z,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${It("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${It("square_sum",v)} / f32(uniforms.hidden_size) ${n?"":"- mean * mean"} + uniforms.epsilon);
        ${g?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${n?"":`- ${z}(mean)`}) *
            ${z}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},k=[{dims:o,dataType:e[0].dataType}];return r>1&&k.push({dims:c,dataType:1}),r>2&&k.push({dims:c,dataType:1}),r>3&&k.push({dims:a,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${g};${m};${_}`,inputDependencies:e.map((T,C)=>"type")},getShaderSource:S,getRunData:()=>({outputs:k,dispatchGroup:{x:Math.ceil(u/d)},programUniforms:b})}},ah=(e,t)=>{Id(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Cd(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Ed,_r,Ad,Gn,zd,Od,sh,oh,ty=P(()=>{"use strict";ee(),ae(),ve(),se(),Ed=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},_r=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},Ad=(e,t)=>{if(e.length>1){let r=_r(e,1),i=_r(e,2),n=_r(e,3);return n.length===0&&(n=[...Array(e[0].dims.length).keys()]),fe({starts:r,ends:i,axes:n})}else return t},Gn=(e,t,r,i,n)=>{let a=e;return e<0&&(a+=r[i[t]]),n[t]<0?Math.max(0,Math.min(a,r[i[t]]-1)):Math.max(0,Math.min(a,r[i[t]]))},zd=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${G("uniforms.input_shape","i",r.length)};
            let steps_i = ${G("uniforms.steps","i",r.length)};
            let signs_i = ${G("uniforms.signs","i",r.length)};
            let starts_i = ${G("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Od=(e,t)=>{let r=e[0].dims,i=A.size(r),n=t.axes.length>0?A.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],a=_r(e,4);a.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),a.length===0&&(a=Array(n.length).fill(1));let s=t.starts.map((v,b)=>Gn(v,b,r,n,a)),o=t.ends.map((v,b)=>Gn(v,b,r,n,a));if(n.length!==s.length||n.length!==o.length)throw new Error("start, ends and axes should have the same number of elements");if(n.length!==r.length)for(let v=0;v<r.length;++v)n.includes(v)||(s.splice(v,0,0),o.splice(v,0,r[v]),a.splice(v,0,1));let u=a.map(v=>Math.sign(v));a.forEach((v,b,S)=>{if(v<0){let k=(o[b]-s[b])/v,T=s[b],C=T+k*a[b];s[b]=C,o[b]=T,S[b]=-v}});let d=r.slice(0);n.forEach((v,b)=>{d[v]=Math.ceil((o[v]-s[v])/a[v])});let c={dims:d,dataType:e[0].dataType},f=H("output",e[0].dataType,d.length),h=R("input",e[0].dataType,e[0].dims.length),g=A.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:u.length},{name:"steps",type:"u32",length:a.length}],_=[{type:12,data:g},{type:12,data:s},{type:6,data:u},{type:12,data:a},...Y(e[0].dims,d)],x=v=>`
      ${v.registerUniforms(m).declareVariables(h,f)}
        ${zd(h,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${u.length}_${s.length}_${a.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:_})}},sh=(e,t)=>{Ed(e.inputs,t);let r=Ad(e.inputs,t);e.compute(Od(e.inputs,r),{inputs:[0]})},oh=e=>{let t=e.starts,r=e.ends,i=e.axes;return fe({starts:t,ends:r,axes:i})}}),Md,Rd,uh,lh,ry=P(()=>{"use strict";ee(),ae(),ve(),Ct(),se(),Md=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Rd=(e,t)=>{let r=e.inputs[0],i=r.dims,n=A.size(i),a=i.length,s=A.normalizeAxis(t.axis,a),o=s<i.length-1,u,d=[];o?(d=Array.from({length:a},(E,z)=>z),d[s]=a-1,d[a-1]=s,u=e.compute(qe(r,d),{inputs:[r],outputs:[-1]})[0]):u=r;let c=u.dims,f=c[a-1],h=n/f,g=we(f),m=f/g,_=64;h===1&&(_=256);let x=(E,z)=>z===4?`max(max(${E}.x, ${E}.y), max(${E}.z, ${E}.w))`:z===2?`max(${E}.x, ${E}.y)`:z===3?`max(max(${E}.x, ${E}.y), ${E}.z)`:E,v=R("x",u.dataType,u.dims,g),b=H("result",u.dataType,u.dims,g),S=v.type.value,k=Se(u.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,T=E=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${E.registerUniform("packedCols","i32").declareVariables(v,b)}
      ${E.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${k}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${x("threadShared[0]",g)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${It("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,C=e.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:u.dataType}],dispatchGroup:{x:h},programUniforms:[{type:6,data:m}]}),getShaderSource:T},{inputs:[u],outputs:[o?-1:0]})[0];o&&e.compute(qe(C,d),{inputs:[C]})},uh=(e,t)=>{Md(e.inputs),Rd(e,t)},lh=e=>fe({axis:e.axis})}),jn,Bd,Nd,Dd,dh,iy=P(()=>{"use strict";ee(),ae(),se(),jn=e=>Array.from(e.getBigInt64Array(),Number),Bd=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(jn(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Nd=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Dd=(e,t)=>{let r=e[0].dims,i=t??jn(e[1]),n=Nd(r,i),a=A.size(n),s=e[0].dataType,o=R("input",s,r.length),u=H("output",s,n.length),d=c=>`
      const inputShape = ${o.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(o,u)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${u.offsetToIndices("global_idx")};
      var input_indices: ${o.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${o.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${u.indicesGet("output_indices","i")}  % input_dim_i;

        ${o.indicesSet("input_indices","i","input_dim_value")}
      }
      ${u.setByOffset("global_idx",o.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},...Y(e[0].dims,n)]}),getShaderSource:d}},dh=e=>{Bd(e.inputs),e.compute(Dd(e.inputs),{inputs:[0]})}}),Pd,Ld,ph,ny=P(()=>{"use strict";ee(),ae(),se(),Pd=(e,t,r,i,n)=>{let a=H("output_data",n,r.length,4),s=R("a_data",t[1].dataType,t[1].dims.length,4),o=R("b_data",t[2].dataType,t[2].dims.length,4),u=R("c_data",t[0].dataType,t[0].dims.length,4),d,c=(f,h,g)=>`select(${h}, ${f}, ${g})`;if(!i)d=a.setByOffset("global_idx",c(s.getByOffset("global_idx"),o.getByOffset("global_idx"),u.getByOffset("global_idx")));else{let f=(h,g,m="")=>{let _=`a_data[index_a${g}][component_a${g}]`,x=`b_data[index_b${g}][component_b${g}]`,v=`bool(c_data[index_c${g}] & (0xffu << (component_c${g} * 8)))`;return`
            let output_indices${g} = ${a.offsetToIndices(`global_idx * 4u + ${g}u`)};
            let offset_a${g} = ${s.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_b${g} = ${o.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let offset_c${g} = ${u.broadcastedIndicesToOffset(`output_indices${g}`,a)};
            let index_a${g} = offset_a${g} / 4u;
            let index_b${g} = offset_b${g} / 4u;
            let index_c${g} = offset_c${g} / 4u;
            let component_a${g} = offset_a${g} % 4u;
            let component_b${g} = offset_b${g} % 4u;
            let component_c${g} = offset_c${g} % 4u;
            ${h}[${g}] = ${m}(${c(_,x,v)});
          `};n===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(u,s,o,a)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Ld=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,n=e[1].dataType,a=!(A.areEqual(t,r)&&A.areEqual(r,i)),s=t,o=A.size(t);if(a){let d=Jt.calcShape(Jt.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,o=A.size(s)}let u=Math.ceil(o/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Pd(d,e,s,a,n),getRunData:()=>({outputs:[{dims:s,dataType:n}],dispatchGroup:{x:Math.ceil(o/64/4)},programUniforms:[{type:12,data:u},...Y(i,t,r,s)]})}},ph=e=>{e.compute(Ld(e.inputs))}}),ch,ay=P(()=>{"use strict";b0(),Ca(),w0(),v0(),$0(),x0(),k0(),E0(),z0(),O0(),M0(),R0(),B0(),N0(),D0(),P0(),L0(),U0(),W0(),q0(),F0(),H0(),V0(),G0(),j0(),zf(),K0(),Y0(),X0(),Z0(),Q0(),Ia(),J0(),Nf(),ey(),ty(),ry(),Rf(),iy(),Ct(),Ea(),ny(),ch=new Map([["Abs",[nc]],["Acos",[ac]],["Acosh",[sc]],["Add",[Uc]],["ArgMax",[ec,na]],["ArgMin",[Jp,na]],["Asin",[oc]],["Asinh",[uc]],["Atan",[lc]],["Atanh",[dc]],["Attention",[tc]],["AveragePool",[Vf,Hf]],["BatchNormalization",[rc]],["BiasAdd",[ic]],["BiasSplitGelu",[Lc]],["Cast",[cc,pc]],["Ceil",[hc]],["Clip",[fc]],["Concat",[Xc,Zc]],["Conv",[da,la]],["ConvTranspose",[uf,of]],["Cos",[mc]],["Cosh",[gc]],["CumSum",[lf,df]],["DepthToSpace",[pf,cf]],["DequantizeLinear",[Qf,Jf]],["Div",[Wc]],["Einsum",[ff,hf]],["Elu",[yc,xr]],["Equal",[qc]],["Erf",[_c]],["Exp",[bc]],["Expand",[mf]],["FastGelu",[gf]],["Floor",[wc]],["FusedConv",[da,la]],["Gather",[_f,yf]],["GatherElements",[kf,xf]],["GatherBlockQuantized",[vf,$f]],["GatherND",[bf,wf]],["Gelu",[vc]],["Gemm",[Tf,Sf]],["GlobalAveragePool",[jf,Gf]],["GlobalMaxPool",[Zf,Xf]],["Greater",[Gc]],["GreaterOrEqual",[Kc]],["GridSample",[If,Cf]],["GroupQueryAttention",[Df]],["HardSigmoid",[Ec,Cc]],["InstanceNormalization",[Pf]],["LayerNormalization",[Lf]],["LeakyRelu",[$c,xr]],["Less",[jc]],["LessOrEqual",[Yc]],["Log",[Dc]],["MatMul",[Uf]],["MatMulNBits",[Wf,qf]],["MaxPool",[Kf,Yf]],["Mul",[Fc]],["MultiHeadAttention",[Af,Ef]],["Neg",[kc]],["Not",[xc]],["Pad",[Ff]],["Pow",[Hc]],["QuickGelu",[Pc,xr]],["Range",[eh]],["Reciprocal",[Sc]],["ReduceMin",[Kp]],["ReduceMean",[Fp]],["ReduceMax",[jp]],["ReduceSum",[Xp]],["ReduceProd",[Yp]],["ReduceL1",[Hp]],["ReduceL2",[Vp]],["ReduceLogSum",[Qp]],["ReduceLogSumExp",[Gp]],["ReduceSumSquare",[Zp]],["Relu",[Tc]],["Resize",[ih,nh]],["RotaryEmbedding",[Bf]],["ScatterND",[rh,th]],["Sigmoid",[Ic]],["Sin",[Ac]],["Sinh",[zc]],["Slice",[sh,oh]],["SkipLayerNormalization",[ah]],["Split",[Of,Mf]],["Sqrt",[Oc]],["Softmax",[uh,lh]],["Sub",[Vc]],["Tan",[Mc]],["Tanh",[Rc]],["ThresholdedRelu",[Nc,xr]],["Tile",[dh]],["Transpose",[zp,Op]],["Where",[ph]]])}),fh,sy=P(()=>{"use strict";tt(),mt(),se(),fh=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,n){ut(e.programInfo.name);let a=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let o=[];for(let d of t)o.push({binding:o.length,resource:{buffer:d.buffer}});for(let d of r)o.push({binding:o.length,resource:{buffer:d.buffer}});n&&o.push({binding:o.length,resource:n});let u=a.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:o,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:u,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,u),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),et(e.programInfo.name)}dispose(){}build(e,t){ut(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let n=Ap(t,this.backend.device.limits),a=e.getShaderSource(n),s=`${i.join(`
`)}
${n.additionalImplementations}
${a}`,o=r.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let u=r.createComputePipeline({compute:{module:o,entryPoint:"main"},layout:"auto",label:e.name});return et(e.name),{programInfo:e,computePipeline:u,uniformVariablesInfo:n.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,n=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=n&&r<=n&&i<=n)return[t,r,i];let a=t*r*i,s=Math.ceil(Math.sqrt(a));if(s>n){if(s=Math.ceil(Math.cbrt(a)),s>n)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),hh={};tr(hh,{WebGpuBackend:()=>mh});var Ud,Wd,qd,mh,oy=P(()=>{"use strict";tt(),ee(),mt(),Sp(),y0(),ay(),sy(),Ud=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let n=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${n}`);break}case"rank":{let a=e[i].dims.length;r.push(`${n};${a}`);break}case"dims":{let a=e[i].dims.join(",");r.push(`${n};${a}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Wd=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Ud(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},qd=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},mh=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},n=a=>t.features.has(a)&&r.push(a)&&!0;n("chromium-experimental-timestamp-query-inside-passes")||n("timestamp-query"),n("shader-f16"),n("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new qd(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Cp(this),this.programManager=new fh(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,xa(e.logLevel,!!e.debug),this.device.onuncapturederror=a=>{a.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${a.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;ut(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let n=r[i],a=n.kernelId,s=this.kernels.get(a),o=s.kernelType,u=s.kernelName,d=n.programName,c=n.inputTensorViews,f=n.outputTensorViews,h=t[i*2],g=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=h);let m=Number(h-this.queryTimeBase),_=Number(g-this.queryTimeBase);if(!Number.isSafeInteger(m)||!Number.isSafeInteger(_))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(x=>({dims:x.dims,dataType:ht(x.dataType)})),outputsMetadata:f.map(x=>({dims:x.dims,dataType:ht(x.dataType)})),kernelId:a,kernelType:o,kernelName:u,programName:d,startTime:m,endTime:_});else{let x="";c.forEach((b,S)=>{x+=`input[${S}]: [${b.dims}] | ${ht(b.dataType)}, `});let v="";f.forEach((b,S)=>{v+=`output[${S}]: [${b.dims}] | ${ht(b.dataType)}, `}),console.log(`[profiling] kernel "${a}|${o}|${u}|${d}" ${x}${v}execution time: ${_-m} ns`)}si("GPU",`${d}::${h}::${g}`)}e.unmap(),this.pendingQueries.delete(e)}),et()}run(e,t,r,i,n,a){ut(e.name);let s=[];for(let b=0;b<t.length;++b){let S=t[b].data;if(S===0)continue;let k=this.gpuDataManager.get(S);if(!k)throw new Error(`no GPU data for input: ${S}`);s.push(k)}let{outputs:o,dispatchGroup:u,programUniforms:d}=e.getRunData(t),c=r.length===0?o.map((b,S)=>S):r;if(c.length!==o.length)throw new Error(`Output size ${c.length} must be equal to ${o.length}.`);let f=[],h=[];for(let b=0;b<o.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=a)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let S=c[b]===-1,k=c[b]===-2,T=S||k?n(o[b].dataType,o[b].dims):i(c[b],o[b].dataType,o[b].dims);if(f.push(T),T.data===0)continue;let C=this.gpuDataManager.get(T.data);if(!C)throw new Error(`no GPU data for output: ${T.data}`);if(S&&this.temporaryData.push(C),k){let E=this.kernelPersistentData.get(this.currentKernelId);E||(E=[],this.kernelPersistentData.set(this.currentKernelId,E)),E.push(C)}h.push(C)}if(s.length!==t.length||h.length!==f.length){if(h.length===0)return et(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let g;if(d){let b=0,S=[];d.forEach(E=>{let z=typeof E.data=="number"?[E.data]:E.data;if(z.length===0)return;let N=E.type===10?2:4,q,Q;E.type===10?(Q=z.length>4?16:z.length>2?8:z.length*N,q=z.length>4?16:N*z.length):(Q=z.length<=2?z.length*N:16,q=16),b=Math.ceil(b/Q)*Q,S.push(b);let V=E.type===10?8:4;b+=z.length>4?Math.ceil(z.length/V)*q:z.length*N});let k=16;b=Math.ceil(b/k)*k;let T=new ArrayBuffer(b);d.forEach((E,z)=>{let N=S[z],q=typeof E.data=="number"?[E.data]:E.data;if(E.type===6)new Int32Array(T,N,q.length).set(q);else if(E.type===12)new Uint32Array(T,N,q.length).set(q);else if(E.type===10)new Uint16Array(T,N,q.length).set(q);else if(E.type===1)new Float32Array(T,N,q.length).set(q);else throw new Error(`Unsupported uniform type: ${ht(E.type)}`)});let C=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(C.buffer,0,T,0,b),this.gpuDataManager.release(C.id),g={offset:0,size:b,buffer:C.buffer}}let m=this.programManager.normalizeDispatchGroupSize(u),_=m[1]===1&&m[2]===1,x=Wd(e,t,_),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(e,m),this.programManager.setArtifact(x,v),de("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let b=0;b<d.length;b++){let S=d[b],k=S.type,T=typeof S.data=="number"?1:S.data.length,[C,E]=v.uniformVariablesInfo[b];if(k!==C||T!==E)throw new Error(`Uniform variable ${b} mismatch: expect type ${C} with size ${E}, got type ${k} with size ${T} in program "${v.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${m[0]}x${m[1]}x${m[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(v,s,h,m,g),et(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let n=ch.get(e);if(!n)throw new Error(`kernel not implemented: ${e}`);let a={kernelType:e,kernelName:i,kernelEntry:n[0],attributes:[n[1],r]};this.kernels.set(t,a)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let n=i.kernelType,a=i.kernelName,s=i.kernelEntry,o=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${n}] ${a}" is not allowed to be called recursively`);this.currentKernelId=e,o[0]&&(o[1]=o[0](o[1]),o[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${n}] ${a}"...`);let u=this.env.debug;this.temporaryData=[];try{return u&&this.device.pushErrorScope("validation"),s(t,o[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${n}] ${a}" failed. ${d}`)),1}finally{u&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${n}] ${a}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let n=this.sessionExternalDataMapping.get(e);n||(n=new Map,this.sessionExternalDataMapping.set(e,n));let a=n.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,a);return n.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await ta(this,e,t);return ka(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let n=this.getComputePassEncoder(),a=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),n.setPipeline(a.computePipeline),n.setBindGroup(0,a.bindGroup),n.dispatchWorkgroups(...a.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),gh={};tr(gh,{init:()=>yh});var ti,Fd,yh,uy=P(()=>{"use strict";ee(),mt(),ae(),g0(),ti=class _h{constructor(t,r,i,n){this.module=t,this.dataType=r,this.data=i,this.dims=n}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new _h(this.module,this.dataType,this.data,t)}},Fd=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,n=r/e.PTR_SIZE,a=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*n++,a));let s=Number(e.getValue(i*n++,a));this.outputCount=Number(e.getValue(i*n++,a)),this.customDataOffset=Number(e.getValue(i*n++,"*")),this.customDataSize=Number(e.getValue(i*n++,a));let o=[];for(let u=0;u<s;u++){let d=Number(e.getValue(i*n++,a)),c=Number(e.getValue(i*n++,"*")),f=Number(e.getValue(i*n++,a)),h=[];for(let g=0;g<f;g++)h.push(Number(e.getValue(i*n++,a)));o.push(new ti(e,d,c,h))}this.inputs=o}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],n=(s,o,u)=>new ti(this.module,o,this.output(s,u),u),a=(s,o)=>{let u=Lt(s,o);if(!u)throw new Error(`Unsupported data type: ${s}`);let d=u>0?this.backend.gpuDataManager.create(u).id:0;return new ti(this.module,s,d,o)};return this.backend.run(e,r,i,n,a,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,n=i===4?"i32":"i64",a=this.module.stackAlloc((1+t.length)*i);this.module.setValue(a,t.length,n);for(let s=0;s<t.length;s++)this.module.setValue(a+i*(s+1),t[s],n);return this.module._JsepOutput(this.opKernelContext,e,a)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},yh=async(e,t,r,i)=>{let n=t.jsepInit;if(!n)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let a=(oy(),Tr(hh)).WebGpuBackend,s=new a;await s.initialize(r,i),n("webgpu",[s,o=>s.alloc(Number(o)),o=>s.free(o),(o,u,d,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(o)}, dst=${Number(u)}, size=${Number(d)}`),s.memcpy(Number(o),Number(u));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(o)}, gpuDataId=${Number(u)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(o>>>0),Number(o>>>0)+Number(d));s.upload(Number(u),f)}},async(o,u,d)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${o}, dataOffset=${u}, size=${d}`),await s.download(Number(o),()=>t.HEAPU8.subarray(Number(u)>>>0,Number(u+d)>>>0))},(o,u,d)=>s.createKernel(o,Number(u),d,t.UTF8ToString(t._JsepGetNodeName(Number(u)))),o=>s.releaseKernel(o),(o,u,d,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${o}, contextDataOffset=${u}`);let f=new Fd(t,s,Number(u));return s.computeKernel(Number(o),f,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let a=new Ip(r);n("webnn",[a,()=>a.reserveTensorId(),s=>a.releaseTensorId(s),async(s,o,u,d,c)=>a.ensureTensor(s,o,u,d,c),(s,o)=>{a.uploadTensor(s,o)},async(s,o)=>a.downloadTensor(s,o)])}}}),Hd,Ba,Na,St,Vd,Kn,fi,Da,Pa,Yn,La,Ua,Wa,bh=P(()=>{"use strict";f0(),h0(),ee(),Ft(),ba(),vp(),Hd=(e,t)=>{ge()._OrtInit(e,t)!==0&&he("Can't initialize onnxruntime.")},Ba=async e=>{Hd(e.wasm.numThreads,ui(e.logLevel))},Na=async(e,t)=>{ge().asyncInit?.();{let r=(uy(),Tr(gh)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let i=e.webgpu.adapter;if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let n=e.webgpu.powerPreference;if(n!==void 0&&n!=="low-power"&&n!=="high-performance")throw new Error(`Invalid powerPreference setting: "${n}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:n,forceFallbackAdapter:a}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ge(),e,i)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ge(),e)}}},St=new Map,Vd=e=>{let t=ge(),r=t.stackSave();try{let i=t.PTR_SIZE,n=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,n,n+i)!==0&&he("Can't get session input/output count.");let a=i===4?"i32":"i64";return[Number(t.getValue(n,a)),Number(t.getValue(n+i,a))]}finally{t.stackRestore(r)}},Kn=(e,t)=>{let r=ge(),i=r.stackSave(),n=0;try{let a=r.PTR_SIZE,s=r.stackAlloc(2*a);r._OrtGetInputOutputMetadata(e,t,s,s+a)!==0&&he("Can't get session input/output metadata.");let o=Number(r.getValue(s,"*"));n=Number(r.getValue(s+a,"*"));let u=r.HEAP32[n/4];if(u===0)return[o,0];let d=r.HEAPU32[n/4+1],c=[];for(let f=0;f<d;f++){let h=Number(r.getValue(n+8+f*a,"*"));c.push(h!==0?r.UTF8ToString(h):Number(r.getValue(n+8+(f+d)*a,"*")))}return[o,u,c]}finally{r.stackRestore(i),n!==0&&r._OrtFree(n)}},fi=e=>{let t=ge(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Da=async(e,t)=>{let r,i,n=ge();Array.isArray(e)?[r,i]=e:e.buffer===n.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=fi(e);let a=0,s=0,o=0,u=[],d=[],c=[];try{if([s,u]=await wp(t),t?.externalData&&n.mountExternalData){let k=[];for(let T of t.externalData){let C=typeof T=="string"?T:T.path;k.push($a(typeof T=="string"?T:T.data).then(E=>{n.mountExternalData(C,E)}))}await Promise.all(k)}for(let k of t?.executionProviders??[])if((typeof k=="string"?k:k.name)==="webnn"){if(n.shouldTransferToMLTensor=!1,typeof k!="string"){let T=k,C=T?.context,E=T?.gpuDevice,z=T?.deviceType,N=T?.powerPreference;C?n.currentContext=C:E?n.currentContext=await n.webnnCreateMLContext(E):n.currentContext=await n.webnnCreateMLContext({deviceType:z,powerPreference:N})}else n.currentContext=await n.webnnCreateMLContext();break}a=await n._OrtCreateSession(r,i,s),n.webgpuOnCreateSession?.(a),a===0&&he("Can't create a session."),n.jsepOnCreateSession?.(),n.currentContext&&(n.webnnRegisterMLContext(a,n.currentContext),n.currentContext=void 0,n.shouldTransferToMLTensor=!0);let[f,h]=Vd(a),g=!!t?.enableGraphCapture,m=[],_=[],x=[],v=[],b=[];for(let k=0;k<f;k++){let[T,C,E]=Kn(a,k);T===0&&he("Can't get an input name."),d.push(T);let z=n.UTF8ToString(T);m.push(z),x.push(C===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:ht(C),shape:E})}for(let k=0;k<h;k++){let[T,C,E]=Kn(a,k+f);T===0&&he("Can't get an output name."),c.push(T);let z=n.UTF8ToString(T);_.push(z),v.push(C===0?{name:z,isTensor:!1}:{name:z,isTensor:!0,type:ht(C),shape:E});{if(g&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let N=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[z]??"cpu",q=n.webnnIsGraphOutput;if(N==="cpu"&&q&&q(a,z)){b.push("ml-tensor-cpu-output");continue}if(N!=="cpu"&&N!=="cpu-pinned"&&N!=="gpu-buffer"&&N!=="ml-tensor")throw new Error(`Not supported preferred output location: ${N}.`);if(g&&N!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${N}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(N)}}let S=null;return b.some(k=>k==="gpu-buffer"||k==="ml-tensor"||k==="ml-tensor-cpu-output")&&(o=n._OrtCreateBinding(a),o===0&&he("Can't create IO binding."),S={handle:o,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(k=>k==="ml-tensor-cpu-output"?"ml-tensor":k).map(k=>Jn(k))}),St.set(a,[a,d,c,S,g,!1]),[a,m,_,x,v]}catch(f){throw d.forEach(h=>n._OrtFree(h)),c.forEach(h=>n._OrtFree(h)),o!==0&&n._OrtReleaseBinding(o)!==0&&he("Can't release IO binding."),a!==0&&n._OrtReleaseSession(a)!==0&&he("Can't release session."),f}finally{n._free(r),s!==0&&n._OrtReleaseSessionOptions(s)!==0&&he("Can't release session options."),u.forEach(f=>n._free(f)),n.unmountExternalData?.()}},Pa=e=>{let t=ge(),r=St.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,n,a,s,o]=r;s&&(o&&t._OrtClearBoundOutputs(s.handle)!==0&&he("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&he("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),n.forEach(u=>t._OrtFree(u)),a.forEach(u=>t._OrtFree(u)),t._OrtReleaseSession(i)!==0&&he("Can't release session."),St.delete(e)},Yn=async(e,t,r,i,n,a,s=!1)=>{if(!e){t.push(0);return}let o=ge(),u=o.PTR_SIZE,d=e[0],c=e[1],f=e[3],h=f,g,m;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${a} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;m=Lt(Pt(d),c);{let b=o.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');g=b(i,a,v,m)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;m=Lt(Pt(d),c);let b=o.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');g=b(i,v,Pt(d),c)}else{let v=e[2];if(Array.isArray(v)){m=u*v.length,g=o._malloc(m),r.push(g);for(let b=0;b<v.length;b++){if(typeof v[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);o.setValue(g+b*u,Qe(v[b],r),"*")}}else{let b=o.webnnIsGraphInput,S=o.webnnIsGraphOutput;if(d!=="string"&&b&&S){let k=o.UTF8ToString(n);if(b(i,k)||S(i,k)){let T=Pt(d);m=Lt(T,c),h="ml-tensor";let C=o.webnnCreateTemporaryTensor,E=o.webnnUploadTensor;if(!C||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await C(i,T,c);E(z,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),g=z}else m=v.byteLength,g=o._malloc(m),r.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),g)}else m=v.byteLength,g=o._malloc(m),r.push(g),o.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,m),g)}}let _=o.stackSave(),x=o.stackAlloc(4*c.length);try{c.forEach((b,S)=>o.setValue(x+S*u,b,u===4?"i32":"i64"));let v=o._OrtCreateTensor(Pt(d),g,m,x,c.length,Jn(h));v===0&&he(`Can't create tensor for input/output. session=${i}, index=${a}.`),t.push(v)}finally{o.stackRestore(_)}},La=async(e,t,r,i,n,a)=>{let s=ge(),o=s.PTR_SIZE,u=St.get(e);if(!u)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=u[0],c=u[1],f=u[2],h=u[3],g=u[4],m=u[5],_=t.length,x=i.length,v=0,b=[],S=[],k=[],T=[],C=s.stackSave(),E=s.stackAlloc(_*o),z=s.stackAlloc(_*o),N=s.stackAlloc(x*o),q=s.stackAlloc(x*o);try{[v,b]=bp(a);for(let L=0;L<_;L++)await Yn(r[L],S,T,e,c[t[L]],t[L],g);for(let L=0;L<x;L++)await Yn(n[L],k,T,e,f[i[L]],_+i[L],g);for(let L=0;L<_;L++)s.setValue(E+L*o,S[L],"*"),s.setValue(z+L*o,c[t[L]],"*");for(let L=0;L<x;L++)s.setValue(N+L*o,k[L],"*"),s.setValue(q+L*o,f[i[L]],"*");if(h&&!m){let{handle:L,outputPreferredLocations:ie,outputPreferredLocationsEncoded:X}=h;if(c.length!==_)throw new Error(`input count from feeds (${_}) is expected to be always equal to model's input count (${c.length}).`);for(let F=0;F<_;F++){let ue=t[F];await s._OrtBindInput(L,c[ue],S[F])!==0&&he(`Can't bind input[${F}] for session=${e}.`)}for(let F=0;F<x;F++){let ue=i[F];n[F]?.[3]?s._OrtBindOutput(L,f[ue],k[F],0)!==0&&he(`Can't bind pre-allocated output[${F}] for session=${e}.`):s._OrtBindOutput(L,f[ue],0,X[ue])!==0&&he(`Can't bind output[${F}] to ${ie[F]} for session=${e}.`)}St.set(e,[d,c,f,h,g,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d);let Q;h?Q=await s._OrtRunWithBinding(d,h.handle,x,N,v):Q=await s._OrtRun(d,z,E,_,q,x,N,v),Q!==0&&he("failed to call OrtRun().");let V=[],te=[];for(let L=0;L<x;L++){let ie=Number(s.getValue(N+L*o,"*"));if(ie===k[L]){V.push(n[L]);continue}let X=s.stackSave(),F=s.stackAlloc(4*o),ue=!1,j,le=0;try{s._OrtGetTensorData(ie,F,F+o,F+2*o,F+3*o)!==0&&he(`Can't access output tensor data on index ${L}.`);let B=o===4?"i32":"i64",U=Number(s.getValue(F,B));le=s.getValue(F+o,"*");let re=s.getValue(F+o*2,"*"),O=Number(s.getValue(F+o*3,B)),ne=[];for(let ke=0;ke<O;ke++)ne.push(Number(s.getValue(re+ke*o,B)));s._OrtFree(re)!==0&&he("Can't free memory for tensor dims.");let Oe=ne.reduce((ke,be)=>ke*be,1);j=ht(U);let Fe=h?.outputPreferredLocations[i[L]];if(j==="string"){if(Fe==="gpu-buffer"||Fe==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let ke=[];for(let be=0;be<Oe;be++){let Le=s.getValue(le+be*o,"*"),Be=s.getValue(le+(be+1)*o,"*"),Mr=be===Oe-1?void 0:Be-Le;ke.push(s.UTF8ToString(Le,Mr))}V.push([j,ne,ke,"cpu"])}else if(Fe==="gpu-buffer"&&Oe>0){let ke=s.jsepGetBuffer;if(!ke)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let be=ke(le),Le=Lt(U,Oe);if(Le===void 0||!wa(j))throw new Error(`Unsupported data type: ${j}`);ue=!0,V.push([j,ne,{gpuBuffer:be,download:s.jsepCreateDownloader(be,Le,j),dispose:()=>{s._OrtReleaseTensor(ie)!==0&&he("Can't release tensor.")}},"gpu-buffer"])}else if(Fe==="ml-tensor"&&Oe>0){let ke=s.webnnEnsureTensor,be=s.webnnIsGraphInputOutputTypeSupported;if(!ke||!be)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Lt(U,Oe)===void 0||!va(j))throw new Error(`Unsupported data type: ${j}`);if(!be(e,j,!1))throw new Error(`preferredLocation "ml-tensor" for ${j} output is not supported by current WebNN Context.`);let Le=await ke(e,le,U,ne,!1);ue=!0,V.push([j,ne,{mlTensor:Le,download:s.webnnCreateMLTensorDownloader(le,j),dispose:()=>{s.webnnReleaseTensorId(le),s._OrtReleaseTensor(ie)}},"ml-tensor"])}else if(Fe==="ml-tensor-cpu-output"&&Oe>0){let ke=s.webnnCreateMLTensorDownloader(le,j)(),be=V.length;ue=!0,te.push((async()=>{let Le=[be,await ke];return s.webnnReleaseTensorId(le),s._OrtReleaseTensor(ie),Le})()),V.push([j,ne,[],"cpu"])}else{let ke=hi(j),be=new ke(Oe);new Uint8Array(be.buffer,be.byteOffset,be.byteLength).set(s.HEAPU8.subarray(le,le+be.byteLength)),V.push([j,ne,be,"cpu"])}}finally{s.stackRestore(X),j==="string"&&le&&s._free(le),ue||s._OrtReleaseTensor(ie)}}h&&!g&&(s._OrtClearBoundOutputs(h.handle)!==0&&he("Can't clear bound outputs."),St.set(e,[d,c,f,h,g,!1]));for(let[L,ie]of await Promise.all(te))V[L][2]=ie;return V}finally{s.webnnOnRunEnd?.(d),s.stackRestore(C),S.forEach(Q=>s._OrtReleaseTensor(Q)),k.forEach(Q=>s._OrtReleaseTensor(Q)),T.forEach(Q=>s._free(Q)),v!==0&&s._OrtReleaseRunOptions(v),b.forEach(Q=>s._free(Q))}},Ua=e=>{let t=ge(),r=St.get(e);if(!r)throw new Error("invalid session id");let i=r[0],n=t._OrtEndProfiling(i);n===0&&he("Can't get an profile file name."),t._OrtFree(n)},Wa=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),Tt,Ve,Xt,br,wr,ri,Xn,ii,Bt,Nt,Gd,wh,vh,$h,xh,kh,Sh,Th,Ih=P(()=>{"use strict";tt(),bh(),Ft(),ya(),Tt=()=>!!ye.wasm.proxy&&typeof document<"u",Xt=!1,br=!1,wr=!1,ii=new Map,Bt=(e,t)=>{let r=ii.get(e);r?r.push(t):ii.set(e,[t])},Nt=()=>{if(Xt||!br||wr||!Ve)throw new Error("worker not ready")},Gd=e=>{switch(e.data.type){case"init-wasm":Xt=!1,e.data.err?(wr=!0,Xn[1](e.data.err)):(br=!0,Xn[0]()),ri&&(URL.revokeObjectURL(ri),ri=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=ii.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},wh=async()=>{if(!br){if(Xt)throw new Error("multiple calls to 'initWasm()' detected.");if(wr)throw new Error("previous call to 'initWasm()' failed.");if(Xt=!0,Tt())return new Promise((e,t)=>{Ve?.terminate(),yp().then(([r,i])=>{try{Ve=i,Ve.onerror=a=>t(a),Ve.onmessage=Gd,Xn=[e,t];let n={type:"init-wasm",in:ye};!n.in.wasm.wasmPaths&&(r||Qn)&&(n.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",Je.url).href}),Ve.postMessage(n),ri=r}catch(n){t(n)}},t)});try{await _a(ye.wasm),await Ba(ye),br=!0}catch(e){throw wr=!0,e}finally{Xt=!1}}},vh=async e=>{if(Tt())return Nt(),new Promise((t,r)=>{Bt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:ye}};Ve.postMessage(i)});await Na(ye,e)},$h=async e=>Tt()?(Nt(),new Promise((t,r)=>{Bt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Ve.postMessage(i,[e.buffer])})):fi(e),xh=async(e,t)=>{if(Tt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Nt(),new Promise((r,i)=>{Bt("create",[r,i]);let n={type:"create",in:{model:e,options:{...t}}},a=[];e instanceof Uint8Array&&a.push(e.buffer),Ve.postMessage(n,a)})}else return Da(e,t)},kh=async e=>{if(Tt())return Nt(),new Promise((t,r)=>{Bt("release",[t,r]);let i={type:"release",in:e};Ve.postMessage(i)});Pa(e)},Sh=async(e,t,r,i,n,a)=>{if(Tt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(n.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Nt(),new Promise((s,o)=>{Bt("run",[s,o]);let u=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:u,outputIndices:i,options:a}};Ve.postMessage(d,Wa(u))})}else return La(e,t,r,i,n,a)},Th=async e=>{if(Tt())return Nt(),new Promise((t,r)=>{Bt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Ve.postMessage(i)});Ua(e)}}),Zn,jd,Ch,ly=P(()=>{"use strict";tt(),Ih(),ee(),ga(),vp(),Zn=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},jd=e=>{switch(e[3]){case"cpu":return new Ne(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!wa(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:n}=e[2];return Ne.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:n})}case"ml-tensor":{let t=e[0];if(!va(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:n}=e[2];return Ne.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:n})}default:throw new Error(`invalid data location: ${e[3]}`)}},Ch=class{async fetchModelAndCopyToWasmMemory(e){return $h(await $a(e))}async loadModel(e,t){ut();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await xh(r,t),et()}async dispose(){return kh(this.sessionId)}async run(e,t,r){ut();let i=[],n=[];Object.entries(e).forEach(f=>{let h=f[0],g=f[1],m=this.inputNames.indexOf(h);if(m===-1)throw new Error(`invalid input '${h}'`);i.push(g),n.push(m)});let a=[],s=[];Object.entries(t).forEach(f=>{let h=f[0],g=f[1],m=this.outputNames.indexOf(h);if(m===-1)throw new Error(`invalid output '${h}'`);a.push(g),s.push(m)});let o=i.map((f,h)=>Zn(f,()=>`input "${this.inputNames[n[h]]}"`)),u=a.map((f,h)=>f?Zn(f,()=>`output "${this.outputNames[s[h]]}"`):null),d=await Sh(this.sessionId,n,o,s,u,r),c={};for(let f=0;f<d.length;f++)c[this.outputNames[s[f]]]=a[f]??jd(d[f]);return et(),c}startProfiling(){}endProfiling(){Th(this.sessionId)}}}),Eh={};tr(Eh,{OnnxruntimeWebAssemblyBackend:()=>fa,initializeFlags:()=>ca,wasmBackend:()=>Ah});var ca,fa,Ah,dy=P(()=>{"use strict";tt(),Ih(),ly(),ca=()=>{(typeof ye.wasm.initTimeout!="number"||ye.wasm.initTimeout<0)&&(ye.wasm.initTimeout=0);let e=ye.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ye.wasm.simd=!1),typeof ye.wasm.proxy!="boolean"&&(ye.wasm.proxy=!1),typeof ye.wasm.trace!="boolean"&&(ye.wasm.trace=!1),typeof ye.wasm.numThreads!="number"||!Number.isInteger(ye.wasm.numThreads)||ye.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ye.wasm.numThreads=1;else{let t=typeof navigator>"u"?Yg("node:os").cpus().length:navigator.hardwareConcurrency;ye.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},fa=class{async init(e){ca(),await wh(),await vh(e)}async createInferenceSessionHandler(e,t){let r=new Ch;return await r.loadModel(e,t),r}},Ah=new fa});tt();tt();tt();var py="1.22.0";{let e=(dy(),Tr(Eh)).wasmBackend;Zt("webgpu",e,5),Zt("webnn",e,5),Zt("cpu",e,10),Zt("wasm",e,10)}Object.defineProperty(ye.versions,"web",{value:py,enumerable:!0});function jh(e){return typeof e>"u"||e===null}function cy(e){return typeof e=="object"&&e!==null}function fy(e){return Array.isArray(e)?e:jh(e)?[]:[e]}function hy(e,t){var r,i,n,a;if(t)for(a=Object.keys(t),r=0,i=a.length;r<i;r+=1)n=a[r],e[n]=t[n];return e}function my(e,t){var r="",i;for(i=0;i<t;i+=1)r+=e;return r}function gy(e){return e===0&&Number.NEGATIVE_INFINITY===1/e}var yy=jh,_y=cy,by=fy,wy=my,vy=gy,$y=hy,Te={isNothing:yy,isObject:_y,toArray:by,repeat:wy,isNegativeZero:vy,extend:$y};function Kh(e,t){var r="",i=e.reason||"(unknown reason)";return e.mark?(e.mark.name&&(r+='in "'+e.mark.name+'" '),r+="("+(e.mark.line+1)+":"+(e.mark.column+1)+")",!t&&e.mark.snippet&&(r+=`

`+e.mark.snippet),i+" "+r):i}function Er(e,t){Error.call(this),this.name="YAMLException",this.reason=e,this.mark=t,this.message=Kh(this,!1),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack||""}Er.prototype=Object.create(Error.prototype);Er.prototype.constructor=Er;Er.prototype.toString=function(t){return this.name+": "+Kh(this,t)};var De=Er;function qa(e,t,r,i,n){var a="",s="",o=Math.floor(n/2)-1;return i-t>o&&(a=" ... ",t=i-o+a.length),r-i>o&&(s=" ...",r=i+o-s.length),{str:a+e.slice(t,r).replace(/\t/g,"\u2192")+s,pos:i-t+a.length}}function Fa(e,t){return Te.repeat(" ",t-e.length)+e}function xy(e,t){if(t=Object.create(t||null),!e.buffer)return null;t.maxLength||(t.maxLength=79),typeof t.indent!="number"&&(t.indent=1),typeof t.linesBefore!="number"&&(t.linesBefore=3),typeof t.linesAfter!="number"&&(t.linesAfter=2);for(var r=/\r?\n|\r|\0/g,i=[0],n=[],a,s=-1;a=r.exec(e.buffer);)n.push(a.index),i.push(a.index+a[0].length),e.position<=a.index&&s<0&&(s=i.length-2);s<0&&(s=i.length-1);var o="",u,d,c=Math.min(e.line+t.linesAfter,n.length).toString().length,f=t.maxLength-(t.indent+c+3);for(u=1;u<=t.linesBefore&&!(s-u<0);u++)d=qa(e.buffer,i[s-u],n[s-u],e.position-(i[s]-i[s-u]),f),o=Te.repeat(" ",t.indent)+Fa((e.line-u+1).toString(),c)+" | "+d.str+`
`+o;for(d=qa(e.buffer,i[s],n[s],e.position,f),o+=Te.repeat(" ",t.indent)+Fa((e.line+1).toString(),c)+" | "+d.str+`
`,o+=Te.repeat("-",t.indent+c+3+d.pos)+`^
`,u=1;u<=t.linesAfter&&!(s+u>=n.length);u++)d=qa(e.buffer,i[s+u],n[s+u],e.position-(i[s]-i[s+u]),f),o+=Te.repeat(" ",t.indent)+Fa((e.line+u+1).toString(),c)+" | "+d.str+`
`;return o.replace(/\n$/,"")}var ky=xy,Sy=["kind","multi","resolve","construct","instanceOf","predicate","represent","representName","defaultStyle","styleAliases"],Ty=["scalar","sequence","mapping"];function Iy(e){var t={};return e!==null&&Object.keys(e).forEach(function(r){e[r].forEach(function(i){t[String(i)]=r})}),t}function Cy(e,t){if(t=t||{},Object.keys(t).forEach(function(r){if(Sy.indexOf(r)===-1)throw new De('Unknown option "'+r+'" is met in definition of "'+e+'" YAML type.')}),this.options=t,this.tag=e,this.kind=t.kind||null,this.resolve=t.resolve||function(){return!0},this.construct=t.construct||function(r){return r},this.instanceOf=t.instanceOf||null,this.predicate=t.predicate||null,this.represent=t.represent||null,this.representName=t.representName||null,this.defaultStyle=t.defaultStyle||null,this.multi=t.multi||!1,this.styleAliases=Iy(t.styleAliases||null),Ty.indexOf(this.kind)===-1)throw new De('Unknown kind "'+this.kind+'" is specified for "'+e+'" YAML type.')}var Ae=Cy;function Oh(e,t){var r=[];return e[t].forEach(function(i){var n=r.length;r.forEach(function(a,s){a.tag===i.tag&&a.kind===i.kind&&a.multi===i.multi&&(n=s)}),r[n]=i}),r}function Ey(){var e={scalar:{},sequence:{},mapping:{},fallback:{},multi:{scalar:[],sequence:[],mapping:[],fallback:[]}},t,r;function i(n){n.multi?(e.multi[n.kind].push(n),e.multi.fallback.push(n)):e[n.kind][n.tag]=e.fallback[n.tag]=n}for(t=0,r=arguments.length;t<r;t+=1)arguments[t].forEach(i);return e}function Va(e){return this.extend(e)}Va.prototype.extend=function(t){var r=[],i=[];if(t instanceof Ae)i.push(t);else if(Array.isArray(t))i=i.concat(t);else if(t&&(Array.isArray(t.implicit)||Array.isArray(t.explicit)))t.implicit&&(r=r.concat(t.implicit)),t.explicit&&(i=i.concat(t.explicit));else throw new De("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");r.forEach(function(a){if(!(a instanceof Ae))throw new De("Specified list of YAML types (or a single Type object) contains a non-Type object.");if(a.loadKind&&a.loadKind!=="scalar")throw new De("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");if(a.multi)throw new De("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.")}),i.forEach(function(a){if(!(a instanceof Ae))throw new De("Specified list of YAML types (or a single Type object) contains a non-Type object.")});var n=Object.create(Va.prototype);return n.implicit=(this.implicit||[]).concat(r),n.explicit=(this.explicit||[]).concat(i),n.compiledImplicit=Oh(n,"implicit"),n.compiledExplicit=Oh(n,"explicit"),n.compiledTypeMap=Ey(n.compiledImplicit,n.compiledExplicit),n};var Ay=Va,zy=new Ae("tag:yaml.org,2002:str",{kind:"scalar",construct:function(e){return e!==null?e:""}}),Oy=new Ae("tag:yaml.org,2002:seq",{kind:"sequence",construct:function(e){return e!==null?e:[]}}),My=new Ae("tag:yaml.org,2002:map",{kind:"mapping",construct:function(e){return e!==null?e:{}}}),Ry=new Ay({explicit:[zy,Oy,My]});function By(e){if(e===null)return!0;var t=e.length;return t===1&&e==="~"||t===4&&(e==="null"||e==="Null"||e==="NULL")}function Ny(){return null}function Dy(e){return e===null}var Py=new Ae("tag:yaml.org,2002:null",{kind:"scalar",resolve:By,construct:Ny,predicate:Dy,represent:{canonical:function(){return"~"},lowercase:function(){return"null"},uppercase:function(){return"NULL"},camelcase:function(){return"Null"},empty:function(){return""}},defaultStyle:"lowercase"});function Ly(e){if(e===null)return!1;var t=e.length;return t===4&&(e==="true"||e==="True"||e==="TRUE")||t===5&&(e==="false"||e==="False"||e==="FALSE")}function Uy(e){return e==="true"||e==="True"||e==="TRUE"}function Wy(e){return Object.prototype.toString.call(e)==="[object Boolean]"}var qy=new Ae("tag:yaml.org,2002:bool",{kind:"scalar",resolve:Ly,construct:Uy,predicate:Wy,represent:{lowercase:function(e){return e?"true":"false"},uppercase:function(e){return e?"TRUE":"FALSE"},camelcase:function(e){return e?"True":"False"}},defaultStyle:"lowercase"});function Fy(e){return 48<=e&&e<=57||65<=e&&e<=70||97<=e&&e<=102}function Hy(e){return 48<=e&&e<=55}function Vy(e){return 48<=e&&e<=57}function Gy(e){if(e===null)return!1;var t=e.length,r=0,i=!1,n;if(!t)return!1;if(n=e[r],(n==="-"||n==="+")&&(n=e[++r]),n==="0"){if(r+1===t)return!0;if(n=e[++r],n==="b"){for(r++;r<t;r++)if(n=e[r],n!=="_"){if(n!=="0"&&n!=="1")return!1;i=!0}return i&&n!=="_"}if(n==="x"){for(r++;r<t;r++)if(n=e[r],n!=="_"){if(!Fy(e.charCodeAt(r)))return!1;i=!0}return i&&n!=="_"}if(n==="o"){for(r++;r<t;r++)if(n=e[r],n!=="_"){if(!Hy(e.charCodeAt(r)))return!1;i=!0}return i&&n!=="_"}}if(n==="_")return!1;for(;r<t;r++)if(n=e[r],n!=="_"){if(!Vy(e.charCodeAt(r)))return!1;i=!0}return!(!i||n==="_")}function jy(e){var t=e,r=1,i;if(t.indexOf("_")!==-1&&(t=t.replace(/_/g,"")),i=t[0],(i==="-"||i==="+")&&(i==="-"&&(r=-1),t=t.slice(1),i=t[0]),t==="0")return 0;if(i==="0"){if(t[1]==="b")return r*parseInt(t.slice(2),2);if(t[1]==="x")return r*parseInt(t.slice(2),16);if(t[1]==="o")return r*parseInt(t.slice(2),8)}return r*parseInt(t,10)}function Ky(e){return Object.prototype.toString.call(e)==="[object Number]"&&e%1===0&&!Te.isNegativeZero(e)}var Yy=new Ae("tag:yaml.org,2002:int",{kind:"scalar",resolve:Gy,construct:jy,predicate:Ky,represent:{binary:function(e){return e>=0?"0b"+e.toString(2):"-0b"+e.toString(2).slice(1)},octal:function(e){return e>=0?"0o"+e.toString(8):"-0o"+e.toString(8).slice(1)},decimal:function(e){return e.toString(10)},hexadecimal:function(e){return e>=0?"0x"+e.toString(16).toUpperCase():"-0x"+e.toString(16).toUpperCase().slice(1)}},defaultStyle:"decimal",styleAliases:{binary:[2,"bin"],octal:[8,"oct"],decimal:[10,"dec"],hexadecimal:[16,"hex"]}}),Xy=new RegExp("^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");function Zy(e){return!(e===null||!Xy.test(e)||e[e.length-1]==="_")}function Qy(e){var t,r;return t=e.replace(/_/g,"").toLowerCase(),r=t[0]==="-"?-1:1,"+-".indexOf(t[0])>=0&&(t=t.slice(1)),t===".inf"?r===1?Number.POSITIVE_INFINITY:Number.NEGATIVE_INFINITY:t===".nan"?NaN:r*parseFloat(t,10)}var Jy=/^[-+]?[0-9]+e/;function e_(e,t){var r;if(isNaN(e))switch(t){case"lowercase":return".nan";case"uppercase":return".NAN";case"camelcase":return".NaN"}else if(Number.POSITIVE_INFINITY===e)switch(t){case"lowercase":return".inf";case"uppercase":return".INF";case"camelcase":return".Inf"}else if(Number.NEGATIVE_INFINITY===e)switch(t){case"lowercase":return"-.inf";case"uppercase":return"-.INF";case"camelcase":return"-.Inf"}else if(Te.isNegativeZero(e))return"-0.0";return r=e.toString(10),Jy.test(r)?r.replace("e",".e"):r}function t_(e){return Object.prototype.toString.call(e)==="[object Number]"&&(e%1!==0||Te.isNegativeZero(e))}var r_=new Ae("tag:yaml.org,2002:float",{kind:"scalar",resolve:Zy,construct:Qy,predicate:t_,represent:e_,defaultStyle:"lowercase"}),i_=Ry.extend({implicit:[Py,qy,Yy,r_]}),n_=i_,Yh=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"),Xh=new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");function a_(e){return e===null?!1:Yh.exec(e)!==null||Xh.exec(e)!==null}function s_(e){var t,r,i,n,a,s,o,u=0,d=null,c,f,h;if(t=Yh.exec(e),t===null&&(t=Xh.exec(e)),t===null)throw new Error("Date resolve error");if(r=+t[1],i=+t[2]-1,n=+t[3],!t[4])return new Date(Date.UTC(r,i,n));if(a=+t[4],s=+t[5],o=+t[6],t[7]){for(u=t[7].slice(0,3);u.length<3;)u+="0";u=+u}return t[9]&&(c=+t[10],f=+(t[11]||0),d=(c*60+f)*6e4,t[9]==="-"&&(d=-d)),h=new Date(Date.UTC(r,i,n,a,s,o,u)),d&&h.setTime(h.getTime()-d),h}function o_(e){return e.toISOString()}var u_=new Ae("tag:yaml.org,2002:timestamp",{kind:"scalar",resolve:a_,construct:s_,instanceOf:Date,represent:o_});function l_(e){return e==="<<"||e===null}var d_=new Ae("tag:yaml.org,2002:merge",{kind:"scalar",resolve:l_}),Xa=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;function p_(e){if(e===null)return!1;var t,r,i=0,n=e.length,a=Xa;for(r=0;r<n;r++)if(t=a.indexOf(e.charAt(r)),!(t>64)){if(t<0)return!1;i+=6}return i%8===0}function c_(e){var t,r,i=e.replace(/[\r\n=]/g,""),n=i.length,a=Xa,s=0,o=[];for(t=0;t<n;t++)t%4===0&&t&&(o.push(s>>16&255),o.push(s>>8&255),o.push(s&255)),s=s<<6|a.indexOf(i.charAt(t));return r=n%4*6,r===0?(o.push(s>>16&255),o.push(s>>8&255),o.push(s&255)):r===18?(o.push(s>>10&255),o.push(s>>2&255)):r===12&&o.push(s>>4&255),new Uint8Array(o)}function f_(e){var t="",r=0,i,n,a=e.length,s=Xa;for(i=0;i<a;i++)i%3===0&&i&&(t+=s[r>>18&63],t+=s[r>>12&63],t+=s[r>>6&63],t+=s[r&63]),r=(r<<8)+e[i];return n=a%3,n===0?(t+=s[r>>18&63],t+=s[r>>12&63],t+=s[r>>6&63],t+=s[r&63]):n===2?(t+=s[r>>10&63],t+=s[r>>4&63],t+=s[r<<2&63],t+=s[64]):n===1&&(t+=s[r>>2&63],t+=s[r<<4&63],t+=s[64],t+=s[64]),t}function h_(e){return Object.prototype.toString.call(e)==="[object Uint8Array]"}var m_=new Ae("tag:yaml.org,2002:binary",{kind:"scalar",resolve:p_,construct:c_,predicate:h_,represent:f_}),g_=Object.prototype.hasOwnProperty,y_=Object.prototype.toString;function __(e){if(e===null)return!0;var t=[],r,i,n,a,s,o=e;for(r=0,i=o.length;r<i;r+=1){if(n=o[r],s=!1,y_.call(n)!=="[object Object]")return!1;for(a in n)if(g_.call(n,a))if(!s)s=!0;else return!1;if(!s)return!1;if(t.indexOf(a)===-1)t.push(a);else return!1}return!0}function b_(e){return e!==null?e:[]}var w_=new Ae("tag:yaml.org,2002:omap",{kind:"sequence",resolve:__,construct:b_}),v_=Object.prototype.toString;function $_(e){if(e===null)return!0;var t,r,i,n,a,s=e;for(a=new Array(s.length),t=0,r=s.length;t<r;t+=1){if(i=s[t],v_.call(i)!=="[object Object]"||(n=Object.keys(i),n.length!==1))return!1;a[t]=[n[0],i[n[0]]]}return!0}function x_(e){if(e===null)return[];var t,r,i,n,a,s=e;for(a=new Array(s.length),t=0,r=s.length;t<r;t+=1)i=s[t],n=Object.keys(i),a[t]=[n[0],i[n[0]]];return a}var k_=new Ae("tag:yaml.org,2002:pairs",{kind:"sequence",resolve:$_,construct:x_}),S_=Object.prototype.hasOwnProperty;function T_(e){if(e===null)return!0;var t,r=e;for(t in r)if(S_.call(r,t)&&r[t]!==null)return!1;return!0}function I_(e){return e!==null?e:{}}var C_=new Ae("tag:yaml.org,2002:set",{kind:"mapping",resolve:T_,construct:I_}),Zh=n_.extend({implicit:[u_,d_],explicit:[m_,w_,k_,C_]}),At=Object.prototype.hasOwnProperty,mi=1,Qh=2,Jh=3,gi=4,Ha=1,E_=2,Mh=3,A_=/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,z_=/[\x85\u2028\u2029]/,O_=/[,\[\]\{\}]/,em=/^(?:!|!!|![a-z\-]+!)$/i,tm=/^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;function Rh(e){return Object.prototype.toString.call(e)}function dt(e){return e===10||e===13}function Gt(e){return e===9||e===32}function Pe(e){return e===9||e===32||e===10||e===13}function ir(e){return e===44||e===91||e===93||e===123||e===125}function M_(e){var t;return 48<=e&&e<=57?e-48:(t=e|32,97<=t&&t<=102?t-97+10:-1)}function R_(e){return e===120?2:e===117?4:e===85?8:0}function B_(e){return 48<=e&&e<=57?e-48:-1}function Bh(e){return e===48?"\0":e===97?"\x07":e===98?"\b":e===116||e===9?"	":e===110?`
`:e===118?"\v":e===102?"\f":e===114?"\r":e===101?"\x1B":e===32?" ":e===34?'"':e===47?"/":e===92?"\\":e===78?"\x85":e===95?"\xA0":e===76?"\u2028":e===80?"\u2029":""}function N_(e){return e<=65535?String.fromCharCode(e):String.fromCharCode((e-65536>>10)+55296,(e-65536&1023)+56320)}var rm=new Array(256),im=new Array(256);for(Vt=0;Vt<256;Vt++)rm[Vt]=Bh(Vt)?1:0,im[Vt]=Bh(Vt);var Vt;function D_(e,t){this.input=e,this.filename=t.filename||null,this.schema=t.schema||Zh,this.onWarning=t.onWarning||null,this.legacy=t.legacy||!1,this.json=t.json||!1,this.listener=t.listener||null,this.implicitTypes=this.schema.compiledImplicit,this.typeMap=this.schema.compiledTypeMap,this.length=e.length,this.position=0,this.line=0,this.lineStart=0,this.lineIndent=0,this.firstTabInLine=-1,this.documents=[]}function nm(e,t){var r={name:e.filename,buffer:e.input.slice(0,-1),position:e.position,line:e.line,column:e.position-e.lineStart};return r.snippet=ky(r),new De(t,r)}function J(e,t){throw nm(e,t)}function yi(e,t){e.onWarning&&e.onWarning.call(null,nm(e,t))}var Nh={YAML:function(t,r,i){var n,a,s;t.version!==null&&J(t,"duplication of %YAML directive"),i.length!==1&&J(t,"YAML directive accepts exactly one argument"),n=/^([0-9]+)\.([0-9]+)$/.exec(i[0]),n===null&&J(t,"ill-formed argument of the YAML directive"),a=parseInt(n[1],10),s=parseInt(n[2],10),a!==1&&J(t,"unacceptable YAML version of the document"),t.version=i[0],t.checkLineBreaks=s<2,s!==1&&s!==2&&yi(t,"unsupported YAML version of the document")},TAG:function(t,r,i){var n,a;i.length!==2&&J(t,"TAG directive accepts exactly two arguments"),n=i[0],a=i[1],em.test(n)||J(t,"ill-formed tag handle (first argument) of the TAG directive"),At.call(t.tagMap,n)&&J(t,'there is a previously declared suffix for "'+n+'" tag handle'),tm.test(a)||J(t,"ill-formed tag prefix (second argument) of the TAG directive");try{a=decodeURIComponent(a)}catch{J(t,"tag prefix is malformed: "+a)}t.tagMap[n]=a}};function Et(e,t,r,i){var n,a,s,o;if(t<r){if(o=e.input.slice(t,r),i)for(n=0,a=o.length;n<a;n+=1)s=o.charCodeAt(n),s===9||32<=s&&s<=1114111||J(e,"expected valid JSON character");else A_.test(o)&&J(e,"the stream contains non-printable characters");e.result+=o}}function Dh(e,t,r,i){var n,a,s,o;for(Te.isObject(r)||J(e,"cannot merge mappings; the provided source object is unacceptable"),n=Object.keys(r),s=0,o=n.length;s<o;s+=1)a=n[s],At.call(t,a)||(t[a]=r[a],i[a]=!0)}function nr(e,t,r,i,n,a,s,o,u){var d,c;if(Array.isArray(n))for(n=Array.prototype.slice.call(n),d=0,c=n.length;d<c;d+=1)Array.isArray(n[d])&&J(e,"nested arrays are not supported inside keys"),typeof n=="object"&&Rh(n[d])==="[object Object]"&&(n[d]="[object Object]");if(typeof n=="object"&&Rh(n)==="[object Object]"&&(n="[object Object]"),n=String(n),t===null&&(t={}),i==="tag:yaml.org,2002:merge")if(Array.isArray(a))for(d=0,c=a.length;d<c;d+=1)Dh(e,t,a[d],r);else Dh(e,t,a,r);else!e.json&&!At.call(r,n)&&At.call(t,n)&&(e.line=s||e.line,e.lineStart=o||e.lineStart,e.position=u||e.position,J(e,"duplicated mapping key")),n==="__proto__"?Object.defineProperty(t,n,{configurable:!0,enumerable:!0,writable:!0,value:a}):t[n]=a,delete r[n];return t}function Za(e){var t;t=e.input.charCodeAt(e.position),t===10?e.position++:t===13?(e.position++,e.input.charCodeAt(e.position)===10&&e.position++):J(e,"a line break is expected"),e.line+=1,e.lineStart=e.position,e.firstTabInLine=-1}function xe(e,t,r){for(var i=0,n=e.input.charCodeAt(e.position);n!==0;){for(;Gt(n);)n===9&&e.firstTabInLine===-1&&(e.firstTabInLine=e.position),n=e.input.charCodeAt(++e.position);if(t&&n===35)do n=e.input.charCodeAt(++e.position);while(n!==10&&n!==13&&n!==0);if(dt(n))for(Za(e),n=e.input.charCodeAt(e.position),i++,e.lineIndent=0;n===32;)e.lineIndent++,n=e.input.charCodeAt(++e.position);else break}return r!==-1&&i!==0&&e.lineIndent<r&&yi(e,"deficient indentation"),i}function wi(e){var t=e.position,r;return r=e.input.charCodeAt(t),!!((r===45||r===46)&&r===e.input.charCodeAt(t+1)&&r===e.input.charCodeAt(t+2)&&(t+=3,r=e.input.charCodeAt(t),r===0||Pe(r)))}function Qa(e,t){t===1?e.result+=" ":t>1&&(e.result+=Te.repeat(`
`,t-1))}function P_(e,t,r){var i,n,a,s,o,u,d,c,f=e.kind,h=e.result,g;if(g=e.input.charCodeAt(e.position),Pe(g)||ir(g)||g===35||g===38||g===42||g===33||g===124||g===62||g===39||g===34||g===37||g===64||g===96||(g===63||g===45)&&(n=e.input.charCodeAt(e.position+1),Pe(n)||r&&ir(n)))return!1;for(e.kind="scalar",e.result="",a=s=e.position,o=!1;g!==0;){if(g===58){if(n=e.input.charCodeAt(e.position+1),Pe(n)||r&&ir(n))break}else if(g===35){if(i=e.input.charCodeAt(e.position-1),Pe(i))break}else{if(e.position===e.lineStart&&wi(e)||r&&ir(g))break;if(dt(g))if(u=e.line,d=e.lineStart,c=e.lineIndent,xe(e,!1,-1),e.lineIndent>=t){o=!0,g=e.input.charCodeAt(e.position);continue}else{e.position=s,e.line=u,e.lineStart=d,e.lineIndent=c;break}}o&&(Et(e,a,s,!1),Qa(e,e.line-u),a=s=e.position,o=!1),Gt(g)||(s=e.position+1),g=e.input.charCodeAt(++e.position)}return Et(e,a,s,!1),e.result?!0:(e.kind=f,e.result=h,!1)}function L_(e,t){var r,i,n;if(r=e.input.charCodeAt(e.position),r!==39)return!1;for(e.kind="scalar",e.result="",e.position++,i=n=e.position;(r=e.input.charCodeAt(e.position))!==0;)if(r===39)if(Et(e,i,e.position,!0),r=e.input.charCodeAt(++e.position),r===39)i=e.position,e.position++,n=e.position;else return!0;else dt(r)?(Et(e,i,n,!0),Qa(e,xe(e,!1,t)),i=n=e.position):e.position===e.lineStart&&wi(e)?J(e,"unexpected end of the document within a single quoted scalar"):(e.position++,n=e.position);J(e,"unexpected end of the stream within a single quoted scalar")}function U_(e,t){var r,i,n,a,s,o;if(o=e.input.charCodeAt(e.position),o!==34)return!1;for(e.kind="scalar",e.result="",e.position++,r=i=e.position;(o=e.input.charCodeAt(e.position))!==0;){if(o===34)return Et(e,r,e.position,!0),e.position++,!0;if(o===92){if(Et(e,r,e.position,!0),o=e.input.charCodeAt(++e.position),dt(o))xe(e,!1,t);else if(o<256&&rm[o])e.result+=im[o],e.position++;else if((s=R_(o))>0){for(n=s,a=0;n>0;n--)o=e.input.charCodeAt(++e.position),(s=M_(o))>=0?a=(a<<4)+s:J(e,"expected hexadecimal character");e.result+=N_(a),e.position++}else J(e,"unknown escape sequence");r=i=e.position}else dt(o)?(Et(e,r,i,!0),Qa(e,xe(e,!1,t)),r=i=e.position):e.position===e.lineStart&&wi(e)?J(e,"unexpected end of the document within a double quoted scalar"):(e.position++,i=e.position)}J(e,"unexpected end of the stream within a double quoted scalar")}function W_(e,t){var r=!0,i,n,a,s=e.tag,o,u=e.anchor,d,c,f,h,g,m=Object.create(null),_,x,v,b;if(b=e.input.charCodeAt(e.position),b===91)c=93,g=!1,o=[];else if(b===123)c=125,g=!0,o={};else return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=o),b=e.input.charCodeAt(++e.position);b!==0;){if(xe(e,!0,t),b=e.input.charCodeAt(e.position),b===c)return e.position++,e.tag=s,e.anchor=u,e.kind=g?"mapping":"sequence",e.result=o,!0;r?b===44&&J(e,"expected the node content, but found ','"):J(e,"missed comma between flow collection entries"),x=_=v=null,f=h=!1,b===63&&(d=e.input.charCodeAt(e.position+1),Pe(d)&&(f=h=!0,e.position++,xe(e,!0,t))),i=e.line,n=e.lineStart,a=e.position,ar(e,t,mi,!1,!0),x=e.tag,_=e.result,xe(e,!0,t),b=e.input.charCodeAt(e.position),(h||e.line===i)&&b===58&&(f=!0,b=e.input.charCodeAt(++e.position),xe(e,!0,t),ar(e,t,mi,!1,!0),v=e.result),g?nr(e,o,m,x,_,v,i,n,a):f?o.push(nr(e,null,m,x,_,v,i,n,a)):o.push(_),xe(e,!0,t),b=e.input.charCodeAt(e.position),b===44?(r=!0,b=e.input.charCodeAt(++e.position)):r=!1}J(e,"unexpected end of the stream within a flow collection")}function q_(e,t){var r,i,n=Ha,a=!1,s=!1,o=t,u=0,d=!1,c,f;if(f=e.input.charCodeAt(e.position),f===124)i=!1;else if(f===62)i=!0;else return!1;for(e.kind="scalar",e.result="";f!==0;)if(f=e.input.charCodeAt(++e.position),f===43||f===45)Ha===n?n=f===43?Mh:E_:J(e,"repeat of a chomping mode identifier");else if((c=B_(f))>=0)c===0?J(e,"bad explicit indentation width of a block scalar; it cannot be less than one"):s?J(e,"repeat of an indentation width identifier"):(o=t+c-1,s=!0);else break;if(Gt(f)){do f=e.input.charCodeAt(++e.position);while(Gt(f));if(f===35)do f=e.input.charCodeAt(++e.position);while(!dt(f)&&f!==0)}for(;f!==0;){for(Za(e),e.lineIndent=0,f=e.input.charCodeAt(e.position);(!s||e.lineIndent<o)&&f===32;)e.lineIndent++,f=e.input.charCodeAt(++e.position);if(!s&&e.lineIndent>o&&(o=e.lineIndent),dt(f)){u++;continue}if(e.lineIndent<o){n===Mh?e.result+=Te.repeat(`
`,a?1+u:u):n===Ha&&a&&(e.result+=`
`);break}for(i?Gt(f)?(d=!0,e.result+=Te.repeat(`
`,a?1+u:u)):d?(d=!1,e.result+=Te.repeat(`
`,u+1)):u===0?a&&(e.result+=" "):e.result+=Te.repeat(`
`,u):e.result+=Te.repeat(`
`,a?1+u:u),a=!0,s=!0,u=0,r=e.position;!dt(f)&&f!==0;)f=e.input.charCodeAt(++e.position);Et(e,r,e.position,!1)}return!0}function Ph(e,t){var r,i=e.tag,n=e.anchor,a=[],s,o=!1,u;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=a),u=e.input.charCodeAt(e.position);u!==0&&(e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,J(e,"tab characters must not be used in indentation")),!(u!==45||(s=e.input.charCodeAt(e.position+1),!Pe(s))));){if(o=!0,e.position++,xe(e,!0,-1)&&e.lineIndent<=t){a.push(null),u=e.input.charCodeAt(e.position);continue}if(r=e.line,ar(e,t,Jh,!1,!0),a.push(e.result),xe(e,!0,-1),u=e.input.charCodeAt(e.position),(e.line===r||e.lineIndent>t)&&u!==0)J(e,"bad indentation of a sequence entry");else if(e.lineIndent<t)break}return o?(e.tag=i,e.anchor=n,e.kind="sequence",e.result=a,!0):!1}function F_(e,t,r){var i,n,a,s,o,u,d=e.tag,c=e.anchor,f={},h=Object.create(null),g=null,m=null,_=null,x=!1,v=!1,b;if(e.firstTabInLine!==-1)return!1;for(e.anchor!==null&&(e.anchorMap[e.anchor]=f),b=e.input.charCodeAt(e.position);b!==0;){if(!x&&e.firstTabInLine!==-1&&(e.position=e.firstTabInLine,J(e,"tab characters must not be used in indentation")),i=e.input.charCodeAt(e.position+1),a=e.line,(b===63||b===58)&&Pe(i))b===63?(x&&(nr(e,f,h,g,m,null,s,o,u),g=m=_=null),v=!0,x=!0,n=!0):x?(x=!1,n=!0):J(e,"incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"),e.position+=1,b=i;else{if(s=e.line,o=e.lineStart,u=e.position,!ar(e,r,Qh,!1,!0))break;if(e.line===a){for(b=e.input.charCodeAt(e.position);Gt(b);)b=e.input.charCodeAt(++e.position);if(b===58)b=e.input.charCodeAt(++e.position),Pe(b)||J(e,"a whitespace character is expected after the key-value separator within a block mapping"),x&&(nr(e,f,h,g,m,null,s,o,u),g=m=_=null),v=!0,x=!1,n=!1,g=e.tag,m=e.result;else if(v)J(e,"can not read an implicit mapping pair; a colon is missed");else return e.tag=d,e.anchor=c,!0}else if(v)J(e,"can not read a block mapping entry; a multiline key may not be an implicit key");else return e.tag=d,e.anchor=c,!0}if((e.line===a||e.lineIndent>t)&&(x&&(s=e.line,o=e.lineStart,u=e.position),ar(e,t,gi,!0,n)&&(x?m=e.result:_=e.result),x||(nr(e,f,h,g,m,_,s,o,u),g=m=_=null),xe(e,!0,-1),b=e.input.charCodeAt(e.position)),(e.line===a||e.lineIndent>t)&&b!==0)J(e,"bad indentation of a mapping entry");else if(e.lineIndent<t)break}return x&&nr(e,f,h,g,m,null,s,o,u),v&&(e.tag=d,e.anchor=c,e.kind="mapping",e.result=f),v}function H_(e){var t,r=!1,i=!1,n,a,s;if(s=e.input.charCodeAt(e.position),s!==33)return!1;if(e.tag!==null&&J(e,"duplication of a tag property"),s=e.input.charCodeAt(++e.position),s===60?(r=!0,s=e.input.charCodeAt(++e.position)):s===33?(i=!0,n="!!",s=e.input.charCodeAt(++e.position)):n="!",t=e.position,r){do s=e.input.charCodeAt(++e.position);while(s!==0&&s!==62);e.position<e.length?(a=e.input.slice(t,e.position),s=e.input.charCodeAt(++e.position)):J(e,"unexpected end of the stream within a verbatim tag")}else{for(;s!==0&&!Pe(s);)s===33&&(i?J(e,"tag suffix cannot contain exclamation marks"):(n=e.input.slice(t-1,e.position+1),em.test(n)||J(e,"named tag handle cannot contain such characters"),i=!0,t=e.position+1)),s=e.input.charCodeAt(++e.position);a=e.input.slice(t,e.position),O_.test(a)&&J(e,"tag suffix cannot contain flow indicator characters")}a&&!tm.test(a)&&J(e,"tag name cannot contain such characters: "+a);try{a=decodeURIComponent(a)}catch{J(e,"tag name is malformed: "+a)}return r?e.tag=a:At.call(e.tagMap,n)?e.tag=e.tagMap[n]+a:n==="!"?e.tag="!"+a:n==="!!"?e.tag="tag:yaml.org,2002:"+a:J(e,'undeclared tag handle "'+n+'"'),!0}function V_(e){var t,r;if(r=e.input.charCodeAt(e.position),r!==38)return!1;for(e.anchor!==null&&J(e,"duplication of an anchor property"),r=e.input.charCodeAt(++e.position),t=e.position;r!==0&&!Pe(r)&&!ir(r);)r=e.input.charCodeAt(++e.position);return e.position===t&&J(e,"name of an anchor node must contain at least one character"),e.anchor=e.input.slice(t,e.position),!0}function G_(e){var t,r,i;if(i=e.input.charCodeAt(e.position),i!==42)return!1;for(i=e.input.charCodeAt(++e.position),t=e.position;i!==0&&!Pe(i)&&!ir(i);)i=e.input.charCodeAt(++e.position);return e.position===t&&J(e,"name of an alias node must contain at least one character"),r=e.input.slice(t,e.position),At.call(e.anchorMap,r)||J(e,'unidentified alias "'+r+'"'),e.result=e.anchorMap[r],xe(e,!0,-1),!0}function ar(e,t,r,i,n){var a,s,o,u=1,d=!1,c=!1,f,h,g,m,_,x;if(e.listener!==null&&e.listener("open",e),e.tag=null,e.anchor=null,e.kind=null,e.result=null,a=s=o=gi===r||Jh===r,i&&xe(e,!0,-1)&&(d=!0,e.lineIndent>t?u=1:e.lineIndent===t?u=0:e.lineIndent<t&&(u=-1)),u===1)for(;H_(e)||V_(e);)xe(e,!0,-1)?(d=!0,o=a,e.lineIndent>t?u=1:e.lineIndent===t?u=0:e.lineIndent<t&&(u=-1)):o=!1;if(o&&(o=d||n),(u===1||gi===r)&&(mi===r||Qh===r?_=t:_=t+1,x=e.position-e.lineStart,u===1?o&&(Ph(e,x)||F_(e,x,_))||W_(e,_)?c=!0:(s&&q_(e,_)||L_(e,_)||U_(e,_)?c=!0:G_(e)?(c=!0,(e.tag!==null||e.anchor!==null)&&J(e,"alias node should not have any properties")):P_(e,_,mi===r)&&(c=!0,e.tag===null&&(e.tag="?")),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):u===0&&(c=o&&Ph(e,x))),e.tag===null)e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);else if(e.tag==="?"){for(e.result!==null&&e.kind!=="scalar"&&J(e,'unacceptable node kind for !<?> tag; it should be "scalar", not "'+e.kind+'"'),f=0,h=e.implicitTypes.length;f<h;f+=1)if(m=e.implicitTypes[f],m.resolve(e.result)){e.result=m.construct(e.result),e.tag=m.tag,e.anchor!==null&&(e.anchorMap[e.anchor]=e.result);break}}else if(e.tag!=="!"){if(At.call(e.typeMap[e.kind||"fallback"],e.tag))m=e.typeMap[e.kind||"fallback"][e.tag];else for(m=null,g=e.typeMap.multi[e.kind||"fallback"],f=0,h=g.length;f<h;f+=1)if(e.tag.slice(0,g[f].tag.length)===g[f].tag){m=g[f];break}m||J(e,"unknown tag !<"+e.tag+">"),e.result!==null&&m.kind!==e.kind&&J(e,"unacceptable node kind for !<"+e.tag+'> tag; it should be "'+m.kind+'", not "'+e.kind+'"'),m.resolve(e.result,e.tag)?(e.result=m.construct(e.result,e.tag),e.anchor!==null&&(e.anchorMap[e.anchor]=e.result)):J(e,"cannot resolve a node with !<"+e.tag+"> explicit tag")}return e.listener!==null&&e.listener("close",e),e.tag!==null||e.anchor!==null||c}function j_(e){var t=e.position,r,i,n,a=!1,s;for(e.version=null,e.checkLineBreaks=e.legacy,e.tagMap=Object.create(null),e.anchorMap=Object.create(null);(s=e.input.charCodeAt(e.position))!==0&&(xe(e,!0,-1),s=e.input.charCodeAt(e.position),!(e.lineIndent>0||s!==37));){for(a=!0,s=e.input.charCodeAt(++e.position),r=e.position;s!==0&&!Pe(s);)s=e.input.charCodeAt(++e.position);for(i=e.input.slice(r,e.position),n=[],i.length<1&&J(e,"directive name must not be less than one character in length");s!==0;){for(;Gt(s);)s=e.input.charCodeAt(++e.position);if(s===35){do s=e.input.charCodeAt(++e.position);while(s!==0&&!dt(s));break}if(dt(s))break;for(r=e.position;s!==0&&!Pe(s);)s=e.input.charCodeAt(++e.position);n.push(e.input.slice(r,e.position))}s!==0&&Za(e),At.call(Nh,i)?Nh[i](e,i,n):yi(e,'unknown document directive "'+i+'"')}if(xe(e,!0,-1),e.lineIndent===0&&e.input.charCodeAt(e.position)===45&&e.input.charCodeAt(e.position+1)===45&&e.input.charCodeAt(e.position+2)===45?(e.position+=3,xe(e,!0,-1)):a&&J(e,"directives end mark is expected"),ar(e,e.lineIndent-1,gi,!1,!0),xe(e,!0,-1),e.checkLineBreaks&&z_.test(e.input.slice(t,e.position))&&yi(e,"non-ASCII line breaks are interpreted as content"),e.documents.push(e.result),e.position===e.lineStart&&wi(e)){e.input.charCodeAt(e.position)===46&&(e.position+=3,xe(e,!0,-1));return}if(e.position<e.length-1)J(e,"end of the stream or a document separator is expected");else return}function am(e,t){e=String(e),t=t||{},e.length!==0&&(e.charCodeAt(e.length-1)!==10&&e.charCodeAt(e.length-1)!==13&&(e+=`
`),e.charCodeAt(0)===65279&&(e=e.slice(1)));var r=new D_(e,t),i=e.indexOf("\0");for(i!==-1&&(r.position=i,J(r,"null byte is not allowed in input")),r.input+="\0";r.input.charCodeAt(r.position)===32;)r.lineIndent+=1,r.position+=1;for(;r.position<r.length-1;)j_(r);return r.documents}function K_(e,t,r){t!==null&&typeof t=="object"&&typeof r>"u"&&(r=t,t=null);var i=am(e,r);if(typeof t!="function")return i;for(var n=0,a=i.length;n<a;n+=1)t(i[n])}function Y_(e,t){var r=am(e,t);if(r.length!==0){if(r.length===1)return r[0];throw new De("expected a single document in the stream, but found more")}}var X_=K_,Z_=Y_,sm={loadAll:X_,load:Z_},om=Object.prototype.toString,um=Object.prototype.hasOwnProperty,Ja=65279,Q_=9,Ar=10,J_=13,eb=32,tb=33,rb=34,Ga=35,ib=37,nb=38,ab=39,sb=42,lm=44,ob=45,_i=58,ub=61,lb=62,db=63,pb=64,dm=91,pm=93,cb=96,cm=123,fb=124,fm=125,ze={};ze[0]="\\0";ze[7]="\\a";ze[8]="\\b";ze[9]="\\t";ze[10]="\\n";ze[11]="\\v";ze[12]="\\f";ze[13]="\\r";ze[27]="\\e";ze[34]='\\"';ze[92]="\\\\";ze[133]="\\N";ze[160]="\\_";ze[8232]="\\L";ze[8233]="\\P";var hb=["y","Y","yes","Yes","YES","on","On","ON","n","N","no","No","NO","off","Off","OFF"],mb=/^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;function gb(e,t){var r,i,n,a,s,o,u;if(t===null)return{};for(r={},i=Object.keys(t),n=0,a=i.length;n<a;n+=1)s=i[n],o=String(t[s]),s.slice(0,2)==="!!"&&(s="tag:yaml.org,2002:"+s.slice(2)),u=e.compiledTypeMap.fallback[s],u&&um.call(u.styleAliases,o)&&(o=u.styleAliases[o]),r[s]=o;return r}function yb(e){var t,r,i;if(t=e.toString(16).toUpperCase(),e<=255)r="x",i=2;else if(e<=65535)r="u",i=4;else if(e<=4294967295)r="U",i=8;else throw new De("code point within a string may not be greater than 0xFFFFFFFF");return"\\"+r+Te.repeat("0",i-t.length)+t}var _b=1,zr=2;function bb(e){this.schema=e.schema||Zh,this.indent=Math.max(1,e.indent||2),this.noArrayIndent=e.noArrayIndent||!1,this.skipInvalid=e.skipInvalid||!1,this.flowLevel=Te.isNothing(e.flowLevel)?-1:e.flowLevel,this.styleMap=gb(this.schema,e.styles||null),this.sortKeys=e.sortKeys||!1,this.lineWidth=e.lineWidth||80,this.noRefs=e.noRefs||!1,this.noCompatMode=e.noCompatMode||!1,this.condenseFlow=e.condenseFlow||!1,this.quotingType=e.quotingType==='"'?zr:_b,this.forceQuotes=e.forceQuotes||!1,this.replacer=typeof e.replacer=="function"?e.replacer:null,this.implicitTypes=this.schema.compiledImplicit,this.explicitTypes=this.schema.compiledExplicit,this.tag=null,this.result="",this.duplicates=[],this.usedDuplicates=null}function Lh(e,t){for(var r=Te.repeat(" ",t),i=0,n=-1,a="",s,o=e.length;i<o;)n=e.indexOf(`
`,i),n===-1?(s=e.slice(i),i=o):(s=e.slice(i,n+1),i=n+1),s.length&&s!==`
`&&(a+=r),a+=s;return a}function ja(e,t){return`
`+Te.repeat(" ",e.indent*t)}function wb(e,t){var r,i,n;for(r=0,i=e.implicitTypes.length;r<i;r+=1)if(n=e.implicitTypes[r],n.resolve(t))return!0;return!1}function bi(e){return e===eb||e===Q_}function Or(e){return 32<=e&&e<=126||161<=e&&e<=55295&&e!==8232&&e!==8233||57344<=e&&e<=65533&&e!==Ja||65536<=e&&e<=1114111}function Uh(e){return Or(e)&&e!==Ja&&e!==J_&&e!==Ar}function Wh(e,t,r){var i=Uh(e),n=i&&!bi(e);return(r?i:i&&e!==lm&&e!==dm&&e!==pm&&e!==cm&&e!==fm)&&e!==Ga&&!(t===_i&&!n)||Uh(t)&&!bi(t)&&e===Ga||t===_i&&n}function vb(e){return Or(e)&&e!==Ja&&!bi(e)&&e!==ob&&e!==db&&e!==_i&&e!==lm&&e!==dm&&e!==pm&&e!==cm&&e!==fm&&e!==Ga&&e!==nb&&e!==sb&&e!==tb&&e!==fb&&e!==ub&&e!==lb&&e!==ab&&e!==rb&&e!==ib&&e!==pb&&e!==cb}function $b(e){return!bi(e)&&e!==_i}function Cr(e,t){var r=e.charCodeAt(t),i;return r>=55296&&r<=56319&&t+1<e.length&&(i=e.charCodeAt(t+1),i>=56320&&i<=57343)?(r-55296)*1024+i-56320+65536:r}function hm(e){var t=/^\n* /;return t.test(e)}var mm=1,Ka=2,gm=3,ym=4,rr=5;function xb(e,t,r,i,n,a,s,o){var u,d=0,c=null,f=!1,h=!1,g=i!==-1,m=-1,_=vb(Cr(e,0))&&$b(Cr(e,e.length-1));if(t||s)for(u=0;u<e.length;d>=65536?u+=2:u++){if(d=Cr(e,u),!Or(d))return rr;_=_&&Wh(d,c,o),c=d}else{for(u=0;u<e.length;d>=65536?u+=2:u++){if(d=Cr(e,u),d===Ar)f=!0,g&&(h=h||u-m-1>i&&e[m+1]!==" ",m=u);else if(!Or(d))return rr;_=_&&Wh(d,c,o),c=d}h=h||g&&u-m-1>i&&e[m+1]!==" "}return!f&&!h?_&&!s&&!n(e)?mm:a===zr?rr:Ka:r>9&&hm(e)?rr:s?a===zr?rr:Ka:h?ym:gm}function kb(e,t,r,i,n){e.dump=(function(){if(t.length===0)return e.quotingType===zr?'""':"''";if(!e.noCompatMode&&(hb.indexOf(t)!==-1||mb.test(t)))return e.quotingType===zr?'"'+t+'"':"'"+t+"'";var a=e.indent*Math.max(1,r),s=e.lineWidth===-1?-1:Math.max(Math.min(e.lineWidth,40),e.lineWidth-a),o=i||e.flowLevel>-1&&r>=e.flowLevel;function u(d){return wb(e,d)}switch(xb(t,o,e.indent,s,u,e.quotingType,e.forceQuotes&&!i,n)){case mm:return t;case Ka:return"'"+t.replace(/'/g,"''")+"'";case gm:return"|"+qh(t,e.indent)+Fh(Lh(t,a));case ym:return">"+qh(t,e.indent)+Fh(Lh(Sb(t,s),a));case rr:return'"'+Tb(t)+'"';default:throw new De("impossible error: invalid scalar style")}})()}function qh(e,t){var r=hm(e)?String(t):"",i=e[e.length-1]===`
`,n=i&&(e[e.length-2]===`
`||e===`
`),a=n?"+":i?"":"-";return r+a+`
`}function Fh(e){return e[e.length-1]===`
`?e.slice(0,-1):e}function Sb(e,t){for(var r=/(\n+)([^\n]*)/g,i=(function(){var d=e.indexOf(`
`);return d=d!==-1?d:e.length,r.lastIndex=d,Hh(e.slice(0,d),t)})(),n=e[0]===`
`||e[0]===" ",a,s;s=r.exec(e);){var o=s[1],u=s[2];a=u[0]===" ",i+=o+(!n&&!a&&u!==""?`
`:"")+Hh(u,t),n=a}return i}function Hh(e,t){if(e===""||e[0]===" ")return e;for(var r=/ [^ ]/g,i,n=0,a,s=0,o=0,u="";i=r.exec(e);)o=i.index,o-n>t&&(a=s>n?s:o,u+=`
`+e.slice(n,a),n=a+1),s=o;return u+=`
`,e.length-n>t&&s>n?u+=e.slice(n,s)+`
`+e.slice(s+1):u+=e.slice(n),u.slice(1)}function Tb(e){for(var t="",r=0,i,n=0;n<e.length;r>=65536?n+=2:n++)r=Cr(e,n),i=ze[r],!i&&Or(r)?(t+=e[n],r>=65536&&(t+=e[n+1])):t+=i||yb(r);return t}function Ib(e,t,r){var i="",n=e.tag,a,s,o;for(a=0,s=r.length;a<s;a+=1)o=r[a],e.replacer&&(o=e.replacer.call(r,String(a),o)),(gt(e,t,o,!1,!1)||typeof o>"u"&&gt(e,t,null,!1,!1))&&(i!==""&&(i+=","+(e.condenseFlow?"":" ")),i+=e.dump);e.tag=n,e.dump="["+i+"]"}function Vh(e,t,r,i){var n="",a=e.tag,s,o,u;for(s=0,o=r.length;s<o;s+=1)u=r[s],e.replacer&&(u=e.replacer.call(r,String(s),u)),(gt(e,t+1,u,!0,!0,!1,!0)||typeof u>"u"&&gt(e,t+1,null,!0,!0,!1,!0))&&((!i||n!=="")&&(n+=ja(e,t)),e.dump&&Ar===e.dump.charCodeAt(0)?n+="-":n+="- ",n+=e.dump);e.tag=a,e.dump=n||"[]"}function Cb(e,t,r){var i="",n=e.tag,a=Object.keys(r),s,o,u,d,c;for(s=0,o=a.length;s<o;s+=1)c="",i!==""&&(c+=", "),e.condenseFlow&&(c+='"'),u=a[s],d=r[u],e.replacer&&(d=e.replacer.call(r,u,d)),gt(e,t,u,!1,!1)&&(e.dump.length>1024&&(c+="? "),c+=e.dump+(e.condenseFlow?'"':"")+":"+(e.condenseFlow?"":" "),gt(e,t,d,!1,!1)&&(c+=e.dump,i+=c));e.tag=n,e.dump="{"+i+"}"}function Eb(e,t,r,i){var n="",a=e.tag,s=Object.keys(r),o,u,d,c,f,h;if(e.sortKeys===!0)s.sort();else if(typeof e.sortKeys=="function")s.sort(e.sortKeys);else if(e.sortKeys)throw new De("sortKeys must be a boolean or a function");for(o=0,u=s.length;o<u;o+=1)h="",(!i||n!=="")&&(h+=ja(e,t)),d=s[o],c=r[d],e.replacer&&(c=e.replacer.call(r,d,c)),gt(e,t+1,d,!0,!0,!0)&&(f=e.tag!==null&&e.tag!=="?"||e.dump&&e.dump.length>1024,f&&(e.dump&&Ar===e.dump.charCodeAt(0)?h+="?":h+="? "),h+=e.dump,f&&(h+=ja(e,t)),gt(e,t+1,c,!0,f)&&(e.dump&&Ar===e.dump.charCodeAt(0)?h+=":":h+=": ",h+=e.dump,n+=h));e.tag=a,e.dump=n||"{}"}function Gh(e,t,r){var i,n,a,s,o,u;for(n=r?e.explicitTypes:e.implicitTypes,a=0,s=n.length;a<s;a+=1)if(o=n[a],(o.instanceOf||o.predicate)&&(!o.instanceOf||typeof t=="object"&&t instanceof o.instanceOf)&&(!o.predicate||o.predicate(t))){if(r?o.multi&&o.representName?e.tag=o.representName(t):e.tag=o.tag:e.tag="?",o.represent){if(u=e.styleMap[o.tag]||o.defaultStyle,om.call(o.represent)==="[object Function]")i=o.represent(t,u);else if(um.call(o.represent,u))i=o.represent[u](t,u);else throw new De("!<"+o.tag+'> tag resolver accepts not "'+u+'" style');e.dump=i}return!0}return!1}function gt(e,t,r,i,n,a,s){e.tag=null,e.dump=r,Gh(e,r,!1)||Gh(e,r,!0);var o=om.call(e.dump),u=i,d;i&&(i=e.flowLevel<0||e.flowLevel>t);var c=o==="[object Object]"||o==="[object Array]",f,h;if(c&&(f=e.duplicates.indexOf(r),h=f!==-1),(e.tag!==null&&e.tag!=="?"||h||e.indent!==2&&t>0)&&(n=!1),h&&e.usedDuplicates[f])e.dump="*ref_"+f;else{if(c&&h&&!e.usedDuplicates[f]&&(e.usedDuplicates[f]=!0),o==="[object Object]")i&&Object.keys(e.dump).length!==0?(Eb(e,t,e.dump,n),h&&(e.dump="&ref_"+f+e.dump)):(Cb(e,t,e.dump),h&&(e.dump="&ref_"+f+" "+e.dump));else if(o==="[object Array]")i&&e.dump.length!==0?(e.noArrayIndent&&!s&&t>0?Vh(e,t-1,e.dump,n):Vh(e,t,e.dump,n),h&&(e.dump="&ref_"+f+e.dump)):(Ib(e,t,e.dump),h&&(e.dump="&ref_"+f+" "+e.dump));else if(o==="[object String]")e.tag!=="?"&&kb(e,e.dump,t,a,u);else{if(o==="[object Undefined]")return!1;if(e.skipInvalid)return!1;throw new De("unacceptable kind of an object to dump "+o)}e.tag!==null&&e.tag!=="?"&&(d=encodeURI(e.tag[0]==="!"?e.tag.slice(1):e.tag).replace(/!/g,"%21"),e.tag[0]==="!"?d="!"+d:d.slice(0,18)==="tag:yaml.org,2002:"?d="!!"+d.slice(18):d="!<"+d+">",e.dump=d+" "+e.dump)}return!0}function Ab(e,t){var r=[],i=[],n,a;for(Ya(e,r,i),n=0,a=i.length;n<a;n+=1)t.duplicates.push(r[i[n]]);t.usedDuplicates=new Array(a)}function Ya(e,t,r){var i,n,a;if(e!==null&&typeof e=="object")if(n=t.indexOf(e),n!==-1)r.indexOf(n)===-1&&r.push(n);else if(t.push(e),Array.isArray(e))for(n=0,a=e.length;n<a;n+=1)Ya(e[n],t,r);else for(i=Object.keys(e),n=0,a=i.length;n<a;n+=1)Ya(e[i[n]],t,r)}function zb(e,t){t=t||{};var r=new bb(t);r.noRefs||Ab(e,r);var i=e;return r.replacer&&(i=r.replacer.call({"":i},"",i)),gt(r,0,i,!0,!0)?r.dump+`
`:""}var Ob=zb,Mb={dump:Ob};function es(e,t){return function(){throw new Error("Function yaml."+e+" is removed in js-yaml 4. Use yaml."+t+" instead, which is now safe by default.")}}var yt=sm.load,iw=sm.loadAll,nw=Mb.dump;var aw=es("safeLoad","load"),sw=es("safeLoadAll","loadAll"),ow=es("safeDump","dump");function rt(e,t){if(typeof OffscreenCanvas<"u"&&typeof document>"u")return new OffscreenCanvas(e,t);if(typeof document<"u"){let r=document.createElement("canvas");return r.width=e,r.height=t,r}throw new Error("No canvas implementation available")}function it(e){let t=e.getContext("2d");if(!t)throw new Error("Failed to get 2D context");return t}var $i=class{constructor(t,r={},i=null){this.session=null;this.initialized=!1;this.classNames=["text"];this.modelPath=t,this.configPath=i,this.config={inputShape:[1,3,1280,1280],scoreThreshold:.3,nmsThreshold:.5,maxDetections:100,...r}}async loadConfig(t=null){let r=t||this.configPath;if(!r)return this.config;try{let i=await fetch(r);if(!i.ok)throw new Error(`\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${i.statusText}`);let n=await i.text(),a=yt(n);if(a&&a.layout_detection){let s=a.layout_detection;s.score_threshold!==void 0&&(this.config.scoreThreshold=s.score_threshold),s.nms_threshold!==void 0&&(this.config.nmsThreshold=s.nms_threshold),s.max_detections!==void 0&&(this.config.maxDetections=s.max_detections),s.input_shape!==void 0&&(this.config.inputShape=s.input_shape)}return this.config}catch{return this.config}}async initialize(t=null,r){this.progressCallback=r;try{(t||this.configPath)&&await this.loadConfig(t);let i={executionProviders:["wasm"],graphOptimizationLevel:"all"};this.progressCallback&&this.progressCallback(0,"\u30EC\u30A4\u30A2\u30A6\u30C8\u691C\u51FA\u30E2\u30C7\u30EB\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E2D..."),this.session=await this.createSessionWithProgress(this.modelPath,i,"\u30EC\u30A4\u30A2\u30A6\u30C8\u691C\u51FA\u30E2\u30C7\u30EB");try{this.session&&this.session.inputNames&&this.session.inputNames.length>0}catch{}this.initialized=!0}catch(i){throw new Error(`RTMDet \u30E2\u30C7\u30EB\u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${i.message}`)}}async createSessionWithProgress(t,r,i){try{let n=await fetch(t),a=n.headers.get("content-length");if(a&&this.progressCallback){let s=parseInt(a,10),o=0,u=n.body.getReader(),d=[];for(;;){let{done:g,value:m}=await u.read();if(g)break;d.push(m),o+=m.length;let _=Math.round(o/s*100);this.progressCallback(_,`${i}\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E2D... ${_}%`)}let c=d.reduce((g,m)=>g+m.length,0),f=new Uint8Array(c),h=0;for(let g of d)f.set(g,h),h+=g.length;return this.progressCallback&&this.progressCallback(100,`${i}\u306E\u30ED\u30FC\u30C9\u4E2D...`),await lt.create(f.buffer,r)}else return await lt.create(t,r)}catch{return await lt.create(t,r)}}preprocess(t){let[r,i,n,a]=this.config.inputShape,s,o;t instanceof ImageData?(s=t.width,o=t.height):(s=t.naturalWidth||t.width,o=t.naturalHeight||t.height);let u=Math.max(s,o),d=rt(u,u),c=it(d);if(c.fillStyle="rgb(0, 0, 0)",c.fillRect(0,0,u,u),t instanceof ImageData){let S=rt(t.width,t.height);it(S).putImageData(t,0,0),c.drawImage(S,0,0)}else c.drawImage(t,0,0);let f=rt(a,n),h=it(f);h.drawImage(d,0,0,u,u,0,0,a,n);let m=h.getImageData(0,0,a,n).data,_=new Float32Array(r*i*n*a),x=[123.675,116.28,103.53],v=[58.395,57.12,57.375];for(let S=0;S<n;S++)for(let k=0;k<a;k++){let T=(S*a+k)*4;for(let C=0;C<i;C++){let E=m[T+C],z=C*n*a+S*a+k;_[z]=(E-x[C])/v[C]}}return{tensor:_,metadata:{originalWidth:s,originalHeight:o,maxWH:u,inputWidth:a,inputHeight:n}}}postprocess(t,r){let i=t.dets.data,n=t.labels.data,a=[],s=i.length/5;for(let u=0;u<s;u++){let d=i[u*5+0],c=i[u*5+1],f=i[u*5+2],h=i[u*5+3],g=i[u*5+4],m=Number(n[u]);if(g>=this.config.scoreThreshold){let _=d/this.config.inputShape[3],x=c/this.config.inputShape[2],v=f/this.config.inputShape[3],b=h/this.config.inputShape[2],S=r.maxWH,k=_*S,T=x*S,C=v*S,E=b*S,N=(E-T)*.02;a.push({box:[Math.max(0,Math.round(k)),Math.max(0,Math.round(T-N)),Math.min(r.originalWidth,Math.round(C)),Math.min(r.originalHeight,Math.round(E+N))],score:g,class:m,className:this.classNames?.[m]??`class_${m}`})}}return this.applyNMS(a,this.config.nmsThreshold)}applyNMS(t,r){let i=[...t].sort((a,s)=>s.score-a.score),n=[];for(;i.length>0;){let a=i.shift();n.push(a);for(let s=i.length-1;s>=0;s--)this.calculateIoU(a.box,i[s].box)>=r&&i.splice(s,1);if(n.length>=this.config.maxDetections)break}return n}calculateIoU(t,r){let i=Math.max(t[0],r[0]),n=Math.max(t[1],r[1]),a=Math.min(t[2],r[2]),s=Math.min(t[3],r[3]),o=Math.max(0,a-i)*Math.max(0,s-n);if(o===0)return 0;let u=(t[2]-t[0])*(t[3]-t[1]),d=(r[2]-r[0])*(r[3]-r[1]);return o/(u+d-o)}async detect(t){if(!this.initialized)throw new Error("RTMDet \u30E2\u30C7\u30EB\u304C\u521D\u671F\u5316\u3055\u308C\u3066\u3044\u307E\u305B\u3093");try{let{tensor:r,metadata:i}=this.preprocess(t),n=new Ne("float32",r,this.config.inputShape),a={};a[this.session.inputNames[0]]=n;let s=await this.session.run(a);return this.postprocess(s,i)}catch(r){throw new Error(`\u691C\u51FA\u51E6\u7406\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${r.message}`)}}};var xi=class{constructor(t,r={},i=null,n=null){this.session=null;this.initialized=!1;this.modelPath=t,this.configPath=i,this.charListPath=n,this.config={inputShape:[1,3,32,384],charList:[],maxLength:25,...r}}async loadConfig(t=null){let r=t||this.configPath;if(!r)return this.config;try{let i=await fetch(r);if(!i.ok)throw new Error(`\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${i.statusText}`);let n=await i.text(),a=yt(n);if(a&&a.text_recognition){let s=a.text_recognition;s.input_shape!==void 0&&(this.config.inputShape=s.input_shape),s.max_length!==void 0&&(this.config.maxLength=s.max_length)}return this.config.charList=a.model.charset_train.split(""),this.config}catch{return this.config}}async loadCharList(t=null){let r=t||this.charListPath;if(!r)return this.config.charList;try{let i=await fetch(r);if(!i.ok)throw new Error(`\u6587\u5B57\u30EA\u30B9\u30C8\u30D5\u30A1\u30A4\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${i.statusText}`);let n=await i.text(),a=yt(n);if(a&&a.model&&a.model.charset_train){let s=a.model.charset_train;this.config.charList=s.split("")}return this.config.charList}catch{return this.config.charList}}async initialize(t=null,r=null,i){this.progressCallback=i;try{(t||this.configPath)&&await this.loadConfig(t),(r||this.charListPath)&&await this.loadCharList(r);let n={executionProviders:["wasm"],graphOptimizationLevel:"all"};this.progressCallback&&this.progressCallback(0,"\u6587\u5B57\u8A8D\u8B58\u30E2\u30C7\u30EB\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E2D..."),this.session=await this.createSessionWithProgress(this.modelPath,n,"\u6587\u5B57\u8A8D\u8B58\u30E2\u30C7\u30EB");try{this.session&&this.session.inputNames&&this.session.inputNames.length>0}catch{}this.initialized=!0}catch(n){throw new Error(`PARSEQ \u30E2\u30C7\u30EB\u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${n.message}`)}}async createSessionWithProgress(t,r,i){try{let n=await fetch(t),a=n.headers.get("content-length");if(a&&this.progressCallback){let s=parseInt(a,10),o=0,u=n.body.getReader(),d=[];for(;;){let{done:g,value:m}=await u.read();if(g)break;d.push(m),o+=m.length;let _=Math.round(o/s*100);this.progressCallback(_,`${i}\u3092\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u4E2D... ${_}%`)}let c=d.reduce((g,m)=>g+m.length,0),f=new Uint8Array(c),h=0;for(let g of d)f.set(g,h),h+=g.length;return this.progressCallback&&this.progressCallback(100,`${i}\u306E\u30ED\u30FC\u30C9\u4E2D...`),await lt.create(f.buffer,r)}else return await lt.create(t,r)}catch{return await lt.create(t,r)}}preprocess(t){let[r,i,n,a]=this.config.inputShape,s,o;t instanceof ImageData?(s=t.width,o=t.height):(s=t.naturalWidth||t.width,o=t.naturalHeight||t.height);let u=rt(0,0),d=it(u);if(o>s?(u.width=o,u.height=s,d.translate(u.width/2,u.height/2),d.rotate(-Math.PI/2),d.translate(-u.height/2,-u.width/2)):(u.width=s,u.height=o),t instanceof ImageData){let _=rt(t.width,t.height);it(_).putImageData(t,0,0),d.drawImage(_,0,0)}else d.drawImage(t,0,0);let c=rt(a,n),f=it(c);f.drawImage(u,0,0,a,n);let g=f.getImageData(0,0,a,n).data,m=new Float32Array(r*i*n*a);for(let _=0;_<n;_++)for(let x=0;x<a;x++){let v=(_*a+x)*4;for(let b=0;b<i;b++){let S=g[v+b]/255,k=b*n*a+_*a+x;m[k]=2*(S-.5)}}return m}postprocess(t){let r=this.session.outputNames,i=t[r[0]].data,n=Array.from(i).map(f=>typeof f=="bigint"?Number(f):f),[a,s,o]=t[r[0]].dims,u=[];for(let f=0;f<s;f++){let h=[];for(let _=0;_<o;_++)h.push(n[f*o+_]);let g=Math.max(...h),m=h.indexOf(g);if(m===0)break;m<4||u.push(m-1)}let d=[],c=-1;for(let f of u)f!==c&&(d.push(this.config.charList[f]),c=f);return d.join("")}async read(t){if(!this.initialized)throw new Error("PARSEQ \u30E2\u30C7\u30EB\u304C\u521D\u671F\u5316\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002initialize() \u3092\u5148\u306B\u547C\u3073\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002");try{let r=this.preprocess(t),i=new Ne("float32",r,this.config.inputShape),n={};n[this.session.inputNames[0]]=i;let a=await this.session.run(n);return this.postprocess(a)}catch(r){throw new Error(`\u8A8D\u8B58\u51E6\u7406\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${r.message}`)}}};var _m={verticalMode:!0};async function bm(e){let t={..._m};if(!e)return t;try{let r=await fetch(e);if(!r.ok)throw new Error(`\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${r.statusText}`);let i=await r.text(),n=yt(i);if(n&&n.reading_order){let a=n.reading_order;a.vertical_mode!==void 0&&(t.verticalMode=a.vertical_mode)}return t}catch{return t}}var ki=class{constructor(t=null){this.config=t||{..._m}}process(t,r,i){if(!t||t.length===0)return[];let n=JSON.parse(JSON.stringify(t));n.forEach((o,u)=>{o.id=u});let a=this._xycut(n,r,i),s=[];for(let o of a)o.id!==void 0&&s.push(t[o.id]);return s}_xycut(t,r,i){if(t.length<=1)return t;t.forEach(s=>{let[o,u,d,c]=s.box;s.center={x:(o+d)/2,y:(u+c)/2}});let n=this._trySplitVertical(t,r,i);if(n.length>1){let s=[];for(let o of n)s=s.concat(this._xycut(o,r,i));return s}let a=this._trySplitHorizontal(t,r,i);if(a.length>1){let s=[];for(let o of a)s=s.concat(this._xycut(o,r,i));return s}return this._sortBoxesByPosition(t)}_trySplitVertical(t,r,i){if(t.length<=2)return[t];let n=t.map(m=>{let[_,x,v,b]=m.box;return{min:x,max:b}}),a=Math.min(...n.map(m=>m.min)),s=Math.max(...n.map(m=>m.max)),o=s-a,u=[],d=o/20;for(let m=a+d;m<s-d;m+=d){let _=!1;for(let x of n)if(x.min<m&&x.max>m){_=!0;break}_||u.push(m)}if(u.length===0)return[t];let c=a+o/2,f=u.reduce((m,_)=>Math.abs(_-c)<Math.abs(m-c)?_:m),h=t.filter(m=>m.center&&m.center.y<f),g=t.filter(m=>m.center&&m.center.y>=f);return h.length===0||g.length===0?[t]:[h,g]}_trySplitHorizontal(t,r,i){if(t.length<=2)return[t];let n=t.map(m=>{let[_,x,v,b]=m.box;return{min:_,max:v}}),a=Math.min(...n.map(m=>m.min)),s=Math.max(...n.map(m=>m.max)),o=s-a,u=[],d=o/20;for(let m=a+d;m<s-d;m+=d){let _=!1;for(let x of n)if(x.min<m&&x.max>m){_=!0;break}_||u.push(m)}if(u.length===0)return[t];let c=a+o/2,f=u.reduce((m,_)=>Math.abs(_-c)<Math.abs(m-c)?_:m),h,g;return this.config.verticalMode?(g=t.filter(m=>m.center&&m.center.x>=f),h=t.filter(m=>m.center&&m.center.x<f),[g,h]):(h=t.filter(m=>m.center&&m.center.x<f),g=t.filter(m=>m.center&&m.center.x>=f),[h,g])}_sortBoxesByPosition(t){return this.config.verticalMode?[...t].sort((r,i)=>{if(!r.center||!i.center)return 0;let n=i.center.x-r.center.x;return Math.abs(n)>20?n:r.center.y-i.center.y}):[...t].sort((r,i)=>{if(!r.center||!i.center)return 0;let n=r.center.y-i.center.y;return Math.abs(n)>20?n:r.center.x-i.center.x})}};var wm={xml:{includeConfidence:!0,prettyPrint:!0,encoding:"UTF-8"},json:{includeConfidence:!0,prettyPrint:!0,includeMetadata:!0},txt:{separator:`
`,includeBoundingBox:!1}};async function vm(e){let t={...wm};if(!e)return t;try{let r=await fetch(e);if(!r.ok)throw new Error(`\u8A2D\u5B9A\u30D5\u30A1\u30A4\u30EB\u306E\u53D6\u5F97\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${r.statusText}`);let i=await r.text(),n=yt(i);if(n&&n.output_generation){let a=n.output_generation;a.xml&&(t.xml={...t.xml,...a.xml}),a.json&&(t.json={...t.json,...a.json}),a.txt&&(t.txt={...t.txt,...a.txt})}return t}catch{return t}}var Si=class{constructor(t=null){this.config=t||{...wm}}generateXML(t,r,i,n="image",a=null){if(!t||t.length===0)return`<?xml version="1.0" encoding="${this.config.xml.encoding}"?>
<text>
  <body>
    <p>
      ${a?`<pb n="1" facs="${a}"/>`:""}
    </p>
  </body>
</text>`;let s=`<?xml version="1.0" encoding="${this.config.xml.encoding}"?>
<text>
  <body>
    <p>
`;a&&(s+=`      <pb n="1" facs="${a}"/>
`);for(let o=0;o<t.length;o++){let u=t[o],d=this._escapeXml(u.text||"");d&&(s+=`      ${d}
`)}return s+=`    </p>
  </body>
</text>`,s}generateJSON(t,r,i,n="image"){if(!t||t.length===0)return{document:{image:{name:n,width:r,height:i,text:[]}}};let a=[];for(let o=0;o<t.length;o++){let u=t[o],[d,c,f,h]=u.box,g={id:o+1,x:Math.round(d),y:Math.round(c),width:Math.round(f-d),height:Math.round(h-c),text:u.text||""};this.config.json.includeConfidence&&u.score!==void 0&&(g.confidence=parseFloat(u.score.toFixed(4))),a.push(g)}let s={document:{image:{name:n,width:r,height:i,text:a}}};return this.config.json.includeMetadata&&(s.metadata={timestamp:new Date().toISOString(),version:"1.0.0",engine:"NDLKotenOCR Web"}),s}generateTXT(t){if(!t||t.length===0)return"";let r="";for(let i=0;i<t.length;i++){let n=t[i];if(n.text){if(this.config.txt.includeBoundingBox){let[a,s,o,u]=n.box;r+=`[${i+1}] (${Math.round(a)},${Math.round(s)},${Math.round(o)},${Math.round(u)}): `}r+=n.text,i<t.length-1&&(r+=`
`)}}return r}generateCombinedXML(t,r=[]){if(!t||t.length===0)return`<?xml version="1.0" encoding="${this.config.xml.encoding}"?>
<document>
</document>`;let i=`<?xml version="1.0" encoding="${this.config.xml.encoding}"?>
<document>
`;for(let n=0;n<t.length;n++){let a=t[n],s=r[n]||`image_${n+1}`;i+=`  <image name="${s}" width="${a.json.document.image.width}" height="${a.json.document.image.height}">
`;for(let o=0;o<a.detections.length;o++){let u=a.detections[o],[d,c,f,h]=u.box,g=this._escapeXml(u.text||""),m=`id="${o+1}" x="${Math.round(d)}" y="${Math.round(c)}" width="${Math.round(f-d)}" height="${Math.round(h-c)}"`;this.config.xml.includeConfidence&&u.score!==void 0&&(m+=` confidence="${u.score.toFixed(4)}"`),i+=`    <text ${m}>${g}</text>
`}i+=`  </image>
`}return i+="</document>",i}generateCombinedJSON(t,r=[]){if(!t||t.length===0)return{document:{images:[]}};let i=[];for(let a=0;a<t.length;a++){let s=t[a],o=r[a]||`image_${a+1}`,u=s.json.document.image;u.name=o,i.push(u)}let n={document:{images:i}};return this.config.json.includeMetadata&&(n.metadata={timestamp:new Date().toISOString(),version:"1.0.0",engine:"NDLKotenOCR Web",fileCount:t.length}),n}generateCombinedTXT(t,r=[]){if(!t||t.length===0)return"";let i="";for(let n=0;n<t.length;n++){let a=t[n],s=r[n]||`image_${n+1}`;i+=`===== ${s} =====
`,i+=a.text,n<t.length-1&&(i+=`

`)}return i}_escapeXml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;")}};var Ii=class Ii{constructor(){this.layoutDetector=null;this.textRecognizer=null;this.readingOrderProcessor=null;this.outputGenerator=null;this.initialized=!1;this.progressCallback=null;this.configPath=null}async init(t){let r=t?.modelPath||Ii.DEFAULT_MODEL_BASE,i=t?.modelSize||"small",n=i==="small"?"rtmdet-s-1280x1280.onnx":"rtmdet-l-1920x1920.onnx",a=i==="small"?"parseq-ndl-32x384-tiny-10.onnx":"parseq-ndl-48x576-base-20.onnx";return this.initialize(`${r}${n}`,{},`${r}ndl.yaml`,`${r}${a}`,{},`${r}NDLmoji.yaml`,t?.progressCallback||null)}async initialize(t,r={},i=null,n,a={},s=null,o=null){this.progressCallback=o,this.updateProgress(0,"\u521D\u671F\u5316\u4E2D...\uFF08\u521D\u56DE\u306F\u30E2\u30C7\u30EB\u306E\u30C0\u30A6\u30F3\u30ED\u30FC\u30C9\u306B\u6642\u9593\u304C\u304B\u304B\u308A\u307E\u3059\uFF09"),this.configPath=i||s||null;try{this.layoutDetector=new $i(t,r,i),await this.layoutDetector.initialize(null,(c,f)=>{let h=Math.round(c*.5);this.updateProgress(h,f)}),this.updateProgress(50,"\u30EC\u30A4\u30A2\u30A6\u30C8\u8A8D\u8B58\u30E2\u30C7\u30EB\u3092\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F"),this.textRecognizer=new xi(n,a,null,s),await this.textRecognizer.initialize(null,null,(c,f)=>{let h=50+Math.round(c*.5);this.updateProgress(h,f)}),this.updateProgress(100,"\u6587\u5B57\u8A8D\u8B58\u30E2\u30C7\u30EB\u3092\u30ED\u30FC\u30C9\u3057\u307E\u3057\u305F");let u=this.configPath?await bm(this.configPath):null;this.readingOrderProcessor=new ki(u||{verticalMode:!1});let d=this.configPath?await vm(this.configPath):null;this.outputGenerator=new Si(d),this.initialized=!0}catch(u){throw new Error(`NDLKotenOCR \u306E\u521D\u671F\u5316\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${u instanceof Error?u.message:String(u)}`)}}updateProgress(t,r,i){this.progressCallback&&this.progressCallback(t,r),i&&i(t/100,r)}async process(t,r={}){if(!this.initialized)throw new Error("NDLKotenOCR \u304C\u521D\u671F\u5316\u3055\u308C\u3066\u3044\u307E\u305B\u3093\u3002initialize() \u3092\u5148\u306B\u547C\u3073\u51FA\u3057\u3066\u304F\u3060\u3055\u3044\u3002");this.updateProgress(40,"\u51E6\u7406\u3092\u958B\u59CB\u3057\u307E\u3059",r.onProgress),await new Promise(i=>setTimeout(i,0));try{this.updateProgress(45,"\u30EC\u30A4\u30A2\u30A6\u30C8\u691C\u51FA\u4E2D...",r.onProgress),await new Promise(c=>setTimeout(c,0));let i=await this.layoutDetector.detect(t);this.updateProgress(50,`${i.length}\u500B\u306E\u30C6\u30AD\u30B9\u30C8\u9818\u57DF\u3092\u691C\u51FA\u3057\u307E\u3057\u305F`,r.onProgress),await new Promise(c=>setTimeout(c,0)),this.updateProgress(50,"\u6587\u5B57\u8A8D\u8B58\u4E2D...",r.onProgress),await new Promise(c=>setTimeout(c,0));let n=[],a=0;for(let c of i){let f=this.cropImage(t,c.box),h=await this.textRecognizer.read(f);n.push({...c,text:h}),a++,this.updateProgress(50+Math.floor(a/i.length*30),`\u6587\u5B57\u8A8D\u8B58\u4E2D... (${a}/${i.length})`,r.onProgress),await new Promise(g=>setTimeout(g,0))}this.updateProgress(80,"\u8AAD\u307F\u9806\u51E6\u7406\u4E2D...",r.onProgress),await new Promise(c=>setTimeout(c,0));let s=this.readingOrderProcessor.process(n,"width"in t?t.width:t.naturalWidth||t.width,"height"in t?t.height:t.naturalHeight||t.height);this.updateProgress(90,"\u7D50\u679C\u751F\u6210\u4E2D...",r.onProgress),await new Promise(c=>setTimeout(c,0));let o="width"in t?t.width:t.naturalWidth||t.width,u="height"in t?t.height:t.naturalHeight||t.height,d={detections:s,xml:this.outputGenerator.generateXML(s,o,u,r.imageName||"image"),json:this.outputGenerator.generateJSON(s,o,u,r.imageName||"image"),text:this.outputGenerator.generateTXT(s)};return this.updateProgress(100,"\u51E6\u7406\u5B8C\u4E86",r.onProgress),await new Promise(c=>setTimeout(c,0)),d}catch(i){throw new Error(`\u753B\u50CF\u51E6\u7406\u306B\u5931\u6557\u3057\u307E\u3057\u305F: ${i instanceof Error?i.message:String(i)}`)}}cropImage(t,r){let[i,n,a,s]=r,o=Math.max(1,Math.round(a-i)),u=Math.max(1,Math.round(s-n)),d,c;t instanceof ImageData?(d=t.width,c=t.height):(d=t.naturalWidth||t.width,c=t.naturalHeight||t.height);let f=Math.max(0,Math.min(d-1,Math.round(i))),h=Math.max(0,Math.min(c-1,Math.round(n))),g=Math.min(o,d-f),m=Math.min(u,c-h),_=rt(g,m),x=it(_);if(t instanceof ImageData){let v=rt(t.width,t.height);it(v).putImageData(t,0,0),x.drawImage(v,f,h,g,m,0,0,g,m)}else x.drawImage(t,f,h,g,m,0,0,g,m);return x.getImageData(0,0,g,m)}};Ii.DEFAULT_MODEL_BASE="../models/";var Ti=Ii;var Ci=null;self.addEventListener("message",async e=>{let{type:t,id:r,data:i}=e.data;try{switch(t){case"init":let n=i,a=n.progressCallback?(d,c)=>{self.postMessage({type:"progress",id:r,data:{progress:d,message:c}})}:void 0;Ci=new Ti,await Ci.init({...n,progressCallback:a}),self.postMessage({type:"success",id:r,data:{initialized:!0}});break;case"process":if(!Ci)throw new Error("OCR not initialized. Call init() first.");let s=i,o=s.options?.onProgress?(d,c)=>{self.postMessage({type:"progress",id:r,data:{progress:d,message:c}})}:void 0,u=await Ci.process(s.imageData,{...s.options,onProgress:o});self.postMessage({type:"success",id:r,data:u});break;default:throw new Error(`Unknown message type: ${t}`)}}catch(n){self.postMessage({type:"error",id:r,error:n instanceof Error?n.message:String(n)})}});var $w=null;})();
/*! Bundled license information:

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.22.0
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
//# sourceMappingURL=ocr.worker.global.js.map