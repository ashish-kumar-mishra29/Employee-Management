export interface Emp {
    empId: number,
    contactNumber: string,
    name: string,
    email: string,
    gender:string,
    skills:Skill[];
}

export interface Skill {
    name:string;
    experience:string;
}
