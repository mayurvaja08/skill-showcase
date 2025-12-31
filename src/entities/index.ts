/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: profileinformation
 * Interface for ProfileInformation
 */
export interface ProfileInformation {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  fullName?: string;
  /** @wixFieldType text */
  professionalTitle?: string;
  /** @wixFieldType image */
  profilePicture?: string;
  /** @wixFieldType text */
  introductoryText?: string;
  /** @wixFieldType url */
  cvFileUrl?: string;
  /** @wixFieldType text */
  tagline?: string;
}


/**
 * Collection ID: projects
 * Interface for Projects
 */
export interface Projects {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  projectName?: string;
  /** @wixFieldType image */
  projectThumbnail?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  fullDescription?: string;
  /** @wixFieldType text */
  technologiesUsed?: string;
  /** @wixFieldType url */
  liveDemoUrl?: string;
  /** @wixFieldType url */
  githubRepoUrl?: string;
  /** @wixFieldType date */
  completionDate?: Date | string;
}


/**
 * Collection ID: skills
 * Interface for Skills
 */
export interface Skills {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  skillName?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  proficiencyLevel?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  yearsExperience?: number;
  /** @wixFieldType boolean */
  isKeySkill?: boolean;
}
