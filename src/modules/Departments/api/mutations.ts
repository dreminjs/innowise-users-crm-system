import { graphql } from "@/graphql";

export const CREATE_DEPARTMENT = graphql(`
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`);

export const UPDATE_DEPARTMENT = graphql(`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`);

export const DELETE_DEPARTMENT = graphql(`
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department) {
      affected
    }
  }
`);
