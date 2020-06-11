/* globals cpcBasic */

"use strict";

cpcBasic.addItem("", function () { /*
FRViAOQD/X//iAD3FQb/7wgVFgAwABUjAEGAFQMAMf8BCAB3FQj/7AAVGAARABUfAF7/MegzjIEMAD//iAAAVxUF/88IFQ8AMQwAEMyH9/8VCP/sABD/iAAVCwAD/xUH/88//wD3+/v//4wzyBUDADP///+PAAABf/4VBQAx/////hUDAPf//4jkM/f/FRX/zAIAAPcVCP/+ERUF/wlOFQcAN/8IABUJAHP/uf///7sVG/+f//+OFQQAM+4VBAAVBv/s///IFQMAFQP/FQ0AdwADE+8JM/8VGP/OABUDAP+IFQ0AFQb/l////8x3////iBUMAPeMc/8VHf/uMgAAbhUOAPf/FQb/ALff///+FQ4AEf8VBf/vH///7hP/H///MxUP/4gzFREAFQv/jAAVDgD//wgACDcR7xEVA//sABUR/3+MAABmFREAM/8VB//vCBUQADH3///uFQUAd/8VE/+IAyEPDAAVEQADmxUD/44AACMIABUNABD/FQr/7Df//+wX/48/FQz/iAAVFwAD//+I9wgAAT+AFQwAM/8VC//MNxUD/44AAAAz//+OA////84CABUdAAP/FQQAAQAVCgAz/xUM/8h3DgAVBQD/ABUDADOf/wAAEASAFR0Ad/8VBP+AABUHAAH/FQ3/7gAVCwARyAAAMYgDAgAVHAB3/xUE/53IFQ0AM/8VBv/OABUMABPIAD/vEIwAFR0Ad/8VCP+IABUKADf/FQX/iAAVDgABH4gAFQMAEf7+ABUZADf/FQb/zgAVCwD3/xUE/+4Ac8wVFwABABUZADP/FQP/zwgVDQAT/xUE/wAR7gABABUPAHP//+4R/hUEABATFRUAM////84VEAB3///vFRMAEP8VB//+ABUZADP//8wVEQADDBUVAAH/FQf/7wAVGQA//4kAFSkABwAVAwAT//8IFRoAAf8IANWIFS0AEwAVBADmABVMAPcIFeQAEOQB/X//iPD3/xUF/+8AFRYAMAAVIwDBgAAAYDH/FQMAd/8VB//sABUQAPCAFQYAEcAVHwBe/zHoM4yAAAA3/4gAAFcVBf/MABUPADEIABDMh/f/FQj/7BCQ//iAFQMAgAAVBgAB/xUH/8wz//D3+/v//4wz6BUDADP///+MFQMAf/4VBQAx/////sAw8Pf///j0M/f/FRX//AIAEPf/FQf//pEVBf8oRgDgFQUAN/8IABUJAPP/uf////sVG/+d//+MAADAADPuAAAAIBUG/+z///gVAwAVA/8VDQB3AAAT7wDz/xUY/84AFQMA/4gVDQAVBv+X/////Pf///+IFQwA94hz/xUd/+4yAABuFQ4A9/8VBv/wt9////6AABUMABH/FQX/7xH//+4T/xn///MVD/+IMxURABUL/4wAFQ4A//8IAEA3me8RFQP/7BAVEf9/jAAA5hURADP/FQf/7wAVEADx9///7hUEAGB3FRT/6ABhABUTAAGbFQP/jAAAIxUPABD/FQr//Df//+wT/4wzFQz/iAAVFwAB///49wgQwDOAFQwAM/8VC//MNxUD/4wAAAAz//+MAf///84CABCAFRsAAf8VBAABABUKADP/FQz/yHcVBwD/ABUDADOZ/wAAEASAFR0Ad/8VBP/AABUHAAH/FQ3/7gAVBgDAABUDABHIAABxiAMCABUcAHf/FQT/nfiAABULADP/FQb/zgAVDAAT6AA37xCMEJDAFRsAd/8VCP+IABUKADf/FQX/iAAVDwAR6IAAgAAR/v4AQAAVFwA3/xUG/84AFQoAEPcVBf/uAHPMFTIAM/8VA//OABUNABP/FQT/ABHuABURAHP///7R/hUEABARFRUAM////84VEAB3///vFRMAEP8VB//+ABUZADP//8wVKAAB/xUH/+8AFRkAN/+IABUuABP//wgVGgAB/wgA1YgVLQARABUDADDmFU0A9wgV5AAR/oAP9/8IfxUH/84AFRYAE8AVIgAQHPgAgAZjLxAAAAd//xUG/84AFQ8AMP8IABUEADBx/MAVBQDggBUXAAXf834DOMhQkBP/iAAABX//FQP//IAVDwATwAARjMgVCv/+8fn///iAAAAIFQcAcP8VB//MMxUG/88IA24VAwAz///vCAAAADfvABUEAHP/FQP/zBMVBf/P8xUY/+AAcf8VCf/5/xUD/48CBBD+gBUEABP/FQoAcP/vOxUe/x8J/88IAAAMAHOOAAAAAn//FQT//v///8AQkBUD/4AAFQsAE4AA0c5AFRT/7/8VBP/MAAAAEP+IFQ0AFQb/+f8VB/+IABULAA8w9/8VHf/OEwAABhUOABUI/7/7vf//nwgAFQwAEf8VBf+OAX//jjHvERUR/+8IIwAVEAAVC/+IABUOAD/vAAAEE4nuERUD//6RFRH/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////CBUQAHf//wgVEwAR/xUI/xUaAPP/7wAVKQAVA//vAHf//+4VGgAz/4gAFU0Ad4AVNQCRjBVNAIwAFZgAEPCAAAAAMPH///zAABU9ADOAgARBLQ8Ic/8VB/+MABUXAB6OFSAAcsAAgADARhCHEP8AABEVB/+MABUOABDvFQUAN/8VA/84wBDgAAAQFQ8A8///8PAAMPew4AP/DwgA7DCAEO8VAwAW9xUE/w8QwAAVBgAw84AAFQUA8PHIAxUR//Dw9/zw4AAAAAE//xUH//73//95FQP/yAAVBQAR//+AFQQAAQwVBAAQ987///8I9/8VHP/+gT8MAP//rwwfH/8VBP8T3///AAAAEf/u9gAVAwACABUJAHf//4kP9xUZ/+8PDgBxDBUFAGEMAgAAAAFx/xUE/+53FQP/yHMVA/+IABUKADebyADIAHH/FRP/3v8VBf/sIgAB/wAVDQB//xUF/88DFQT/CHcIABULAHH/FR//zCAgBhUPABUI//v3///OBgAVDAAw988PP+9//4jwM//IE//3FRH/CAAgABUQAHf/FQj/zgAVDwABAPDwwAIADAEf////iBUR/45/gHPOABURAG43FQT/DAA3iBUPADH/FQX//f///8t///8NFRD/7gAVFgAmd///AABAtsAgABUMADH/FQv/mf////joAAAXv////38VBf8PABUbAAc//AAVAwAGABUKADP/FQv//pH//w4VBAAR/wwAADc3//4AAAF8ABUbAAfPf/////4VCgAR/xUN/+oAFQUAAQDMAAAAM4jCFQQAbAAVGwAR/xUF/+4AFQgAE88PDAARFQj/jAAVCwBkERDz/4DwCRqAFRsAd/8VCP+AABUJAAF/FQb/iAAVDQATzNAAAAQVHgAT/xUH/+8AFQsAM/8VBf+IEBUWABDv6AAVGQAVBv/vABUMADP/FQT/iABzABUSAJD3iBDoABUaADP////uFQ8AAX8VA/8MABUSAHD/FQb/6AAVGQAz//+PFREAN/+PABUTABH/FQj/FRoA///uFSoA///PDgA3//+OFRoAE//oABUvADCAFQQAQAAVFgAHmBU0ADDJCAAVTAAIABWVAEAAADH/iBUDAHP/FQP/zAAVOwAQAAMICADEAgAAdxUI/8gAFRcAARgVIADn7BCIEMwEAQgx/4AAAX//FQX/iAAVDgAR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
*/ });
