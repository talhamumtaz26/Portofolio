const badgeRows = [
    [['HTML', 'html'], ['CSS', 'css'], ['JavaScript', 'javascript'], ['TypeScript', 'typescript'], ['React', 'react'], ['Python', 'python'], ['WordPress', 'wordpress'], ['PHP', 'php']],
    [['WooCommerce', 'woocommerce'], ['Shopify', 'shopify'], ['Elementor', 'elementor'], ['Astra', 'astra'], ['React Native', 'react'], ['Capacitor', 'capacitor']],
    [['Firebase', 'firebase'], ['Node.js', 'nodejs'], ['C++', 'cpp'], ['Figma', 'figma']],
    [['Git', 'git'], ['GitHub', 'github'], ['Linux', 'linux']],
    [['VS Code', 'vscode']],
];
export function Skills() {
    return <section id="skills" className="section wrap skills-section" aria-labelledby="skills-title">
        <div className="section-heading reveal">
            <div><p className="eyebrow">/02</p><h2 id="skills-title">Skills</h2></div>
        </div>
        <div className="skill-collection reveal">
            {badgeRows.map((row, index) => <ul className={`skill-badges${index === badgeRows.length - 2 ? ' skill-badges--final-tools' : ''}`} key={index}>
                {row.map(([name, logo]) => <li className={`skill-badge${logo === 'vscode' ? ' skill-badge--vscode' : ''}`} key={name}>
                    <img className={`skill-logo skill-logo-${logo}`} src={`/logos/${logo}.svg`} alt="" width="24" height="24" loading="lazy" decoding="async" />
                    <span>{name}</span>
                </li>)}
            </ul>)}
        </div>
    </section>;
}

