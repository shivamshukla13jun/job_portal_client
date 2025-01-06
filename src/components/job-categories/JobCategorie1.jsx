import React from 'react';
import { Link } from "react-router-dom";
import { paths } from "@/services/paths";
import { categories } from "@/data/category";

// Icon mapping for categories
// Icon mapping for categories using Flaticon
const categoryIcons = {
  'Basic Chemicals': 'flaticon-chemistry',
  'Specialty Chemicals': 'flaticon-laboratory',
  'Agrochemicals': 'flaticon-plant',
  'Petrochemicals': 'flaticon-fuel',
  'Polymers': 'flaticon-molecule',
  'Fine Chemicals': 'flaticon-microscope',
  'Biochemicals': 'flaticon-biohazard',
  'Industrial Gases': 'flaticon-gas-cylinder',
  'Chemical Engineering': 'flaticon-cogs',
  'Dyes and Pigments': 'flaticon-paint-palette',
  'Surfactants': 'flaticon-spray',
  'Adhesives and Sealants': 'flaticon-adhesive',
  'Catalysts': 'flaticon-catalyst',
  'Lubricants and Greases': 'flaticon-oil',
  'Explosives': 'flaticon-explosion',
  'Water Treatment Chemicals': 'flaticon-water',
  'Flavors and Fragrances': 'flaticon-flower',
  'Nutraceuticals': 'flaticon-capsule',
  'Cosmetic Chemicals': 'flaticon-cosmetics',
  'Other': 'flaticon-question'
};

const JobCategorie1 = () => {
  return (
    <>
      {categories.slice(0, 9).map((item, index) => {
        // Get the icon, default to a generic icon if not found
        const iconClass = categoryIcons[item.label]  ||'flaticon-chemistry'
        
        return (
          <div
            className="category-block col-lg-4 col-md-6 col-sm-12"
            key={item.label + index}
          >
            <div className="inner-box">
              <div className="content">
                
                <span className={`icon ${iconClass}`}></span>
                <h4>
                  <Link to={paths.job_list + "?categories=" + item.value}>
                    {item.label}
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        )
      })}
    </>
  );
};

export default JobCategorie1;

// Optional: If you want to export the icon mapping for use elsewhere
export { categoryIcons };