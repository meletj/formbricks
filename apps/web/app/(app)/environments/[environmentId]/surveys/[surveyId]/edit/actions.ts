"use server";

import {
  cloneUserSegment,
  createUserSegment,
  loadNewUserSegment,
  updateUserSegment,
} from "@formbricks/lib/services/userSegment";
import {
  TBaseFilterGroup,
  TUserSegmentUpdateInput,
  ZUserSegmentFilterGroup,
} from "@formbricks/types/v1/userSegment";

export const createUserSegmentAction = async ({
  description,
  environmentId,
  filters,
  isPrivate,
  surveyId,
  title,
}: {
  environmentId: string;
  surveyId: string;
  title: string;
  description: string;
  isPrivate: boolean;
  filters: TBaseFilterGroup;
}) => {
  const parsedFilters = ZUserSegmentFilterGroup.safeParse(filters);

  if (!parsedFilters.success) {
    throw new Error("Invalid filters");
  }

  return await createUserSegment(environmentId, surveyId, title, description, isPrivate, filters);
};

export const updateUserSegmentAction = async (segmentId: string, data: TUserSegmentUpdateInput) => {
  const { filters } = data;
  const parsedFilters = ZUserSegmentFilterGroup.safeParse(filters);

  if (!parsedFilters.success) {
    throw new Error("Invalid filters");
  }

  return await updateUserSegment(segmentId, data);
};

export const loadNewUserSegmentAction = async (surveyId: string, segmentId: string) => {
  return await loadNewUserSegment(surveyId, segmentId);
};

export const cloneUserSegmentAction = async (segmentId: string, surveyId: string) => {
  try {
    const clonedUserSegment = await cloneUserSegment(segmentId, surveyId);
    return clonedUserSegment;
  } catch (err) {
    throw new Error(err);
  }
};
