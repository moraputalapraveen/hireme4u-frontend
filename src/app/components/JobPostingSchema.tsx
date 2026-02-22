import { useEffect } from 'react';
import { Job } from '../data/jobs';

interface JobPostingSchemaProps {
  job: Job;
}

export function JobPostingSchema({ job }: JobPostingSchemaProps) {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description,
      identifier: {
        '@type': 'PropertyValue',
        name: job.company,
        value: job.id,
      },
      datePosted: job.postedDate,
      employmentType: job.jobType.toUpperCase().replace('-', '_'),
      hiringOrganization: {
        '@type': 'Organization',
        name: job.company,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location,
          addressCountry: 'IN',
        },
      },
      baseSalary: job.salary
        ? {
            '@type': 'MonetaryAmount',
            currency: 'INR',
            value: {
              '@type': 'QuantitativeValue',
              value: job.salary,
              unitText: 'YEAR',
            },
          }
        : undefined,
      experienceRequirements: {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: getExperienceMonths(job.experienceLevel),
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'job-posting-schema';

    const existingScript = document.getElementById('job-posting-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('job-posting-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [job]);

  return null;
}

function getExperienceMonths(experienceLevel: string): number {
  switch (experienceLevel) {
    case 'Fresher':
      return 0;
    case '0-1 years':
      return 6;
    case '1-3 years':
      return 24;
    case '3-5 years':
      return 48;
    case '5+ years':
      return 60;
    default:
      return 0;
  }
}
