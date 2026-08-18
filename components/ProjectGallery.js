export default function ProjectGallery({ projectTitle, items = [] }) {
  const galleryItems = [...items]
    .sort((a, b) => a.display_order - b.display_order)
    .slice(0, 3);

  if (galleryItems.length === 0) {
    return null;
  }

  return (
    <section className="project-gallery" aria-label={`${projectTitle} gallery`}>
      <div className="project-gallery-heading">
        <h2>Gallery</h2>
        {galleryItems.length > 1 ? <span>Swipe to browse</span> : null}
      </div>
      <div className="project-gallery-track">
        {galleryItems.map((item) => (
          <figure className="project-gallery-item" key={item.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.image_url} alt={`${projectTitle} — ${item.label}`} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}