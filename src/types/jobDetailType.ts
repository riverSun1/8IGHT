import exp from "constants";

export interface jobDetailType {
  resultCode: number;
  result: {
    recrutPblntSn: number;
    pblntInstCd: string;
    pbadmsStdInstCd: string;
    instNm: string;
    ncsCdLst: string;
    ncsCdNmLst: string;
    hireTypeLst: string;
    hireTypeNmLst: string;
    workRgnLst: string;
    workRgnNmLst: string;
    recrutSe: string;
    recrutSeNm: string;
    prefCondCn: string;
    recrutNope: number;
    pbancBgngYmd: string;
    pbancEndYmd: string;
    recrutPbancTtl: string;
    scrnprcdrMthdExpln: string;
    srcUrl: string;
    replmprYn: string;
    aplyQlfcCn: string;
    acbgCondLst: string;
    acbgCondNmLst: string;
    nonatchRsn: string;
    decimalDay: number;
    prefCn: string;
    disqlfcRsn: string;
    files: [
      {
        recrutAtchFileNo: number;
        sortNo: number;
        atchFileNm: string;
        atchFileType: string;
        url: string;
      }
    ];
    steps: [
      {
        recrutStepSn: number;
        recrutPblntSn: number;
        recrutPbancTtl: string;
        sortNo: number;
        minStepSn: number;
        maxStepSn: number;
      }
    ];
    uniqueArray:
      | {
          recrutStepSn: number;
          recrutPblntSn: number;
          recrutPbancTtl: string;
          sortNo: number;
          minStepSn: number;
          maxStepSn: number;
        }[]
      | undefined;
  };
}
