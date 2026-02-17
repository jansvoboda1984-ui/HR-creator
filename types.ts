
export interface FileData {
  base64: string;
  mimeType: string;
  name: string;
}

export interface JobInputData {
  position: string;
  salary: string;
  hardestPart: string;
  mainBenefit: string;
  tasks: string;
  requirements: string;
  benefits: string;
  companyVibe: string;
  file?: FileData;
}

export interface GeneratedAdResponse {
  criticism?: string;
  headline: string;
  hook: string;
  content: string;
  requirements: string;
  offer: string;
}
