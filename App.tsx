
import React, { useState, useEffect, useMemo } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Menu as MenuIcon,
  X,
  Award,
  ExternalLink,
  UtensilsCrossed,
  Quote,
  Camera,
  MessageSquare,
  Filter,
  ArrowRight,
  Plus
} from 'lucide-react';
import { REVIEWS, MENU, GALLERY_IMAGES } from './constants';
import { Review, MenuItem } from './types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Gallery', href: '#gallery' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-orange-950/95 backdrop-blur-md py-3 shadow-xl border-b border-orange-800/20' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <UtensilsCrossed className="text-orange-500 w-8 h-8 transition-transform group-hover:rotate-12" />
            <span className="text-2xl font-bold text-white tracking-tighter uppercase font-serif">Merrill's BBQ</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-orange-400 transition-colors font-medium text-xs tracking-widest uppercase"
              >
                {link.name}
              </a>
            ))}
            <a
              href="tel:2565437457"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-full font-bold transition-all active:scale-95 shadow-lg flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Order Now</span>
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute w-full bg-orange-950 border-b border-orange-800/50 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block text-white text-lg font-medium hover:text-orange-400 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="tel:2565437457" className="flex items-center justify-center space-x-2 w-full text-center bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg">
            <Phone className="w-5 h-5" />
            <span>Call (256) 543-7457</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-stone-50">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-sm mb-3 block transform hover:scale-105 transition-transform cursor-default">Our Kitchen in Action</span>
          <h2 className="text-5xl md:text-6xl font-black text-stone-900 font-serif italic mb-6 drop-shadow-sm">A Feast for the Eyes</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Get a glimpse of our slow-smoking process and the hand-crafted care that goes into every plate.
            From the fire to the fork, we don't cut corners.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl shadow-lg border border-gray-100">
              <img
                src={img.url}
                alt={img.description}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-sm font-medium leading-tight">{img.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewsSection = () => {
  const [userReviews, setUserReviews] = useState<Review[]>(REVIEWS);
  const [filter, setFilter] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, content: '' });

  const filteredReviews = useMemo(() => {
    return filter ? userReviews.filter(r => r.rating === filter) : userReviews;
  }, [userReviews, filter]);

  const stats = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    userReviews.forEach(r => counts[r.rating - 1]++);
    const total = userReviews.length;
    const avg = userReviews.reduce((acc, r) => acc + r.rating, 0) / total;
    return { counts: counts.reverse(), total, avg: avg.toFixed(1) };
  }, [userReviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.content) return;

    const reviewToAdd: Review = {
      id: Date.now().toString(),
      author: newReview.author,
      location: 'Local Customer',
      date: new Date().toLocaleDateString(),
      content: newReview.content,
      rating: newReview.rating,
      source: 'Website Submission'
    };

    setUserReviews([reviewToAdd, ...userReviews]);
    setNewReview({ author: '', rating: 5, content: '' });
    setIsFormOpen(false);
  };

  const highlightKeyword = (text: string) => {
    const keywords = ['ribs', 'burger', 'burgers', 'brisket', 'pork', 'cheese'];
    let parts = [text];
    keywords.forEach(kw => {
      const nextParts: string[] = [];
      parts.forEach(part => {
        const split = part.split(new RegExp(`(${kw})`, 'gi'));
        nextParts.push(...split);
      });
      parts = nextParts;
    });

    return parts.map((part, i) => (
      keywords.some(kw => part.toLowerCase() === kw.toLowerCase()) ? (
        <span key={i} className="text-orange-500 font-bold bg-orange-500/10 px-1 rounded">{part}</span>
      ) : part
    ));
  };

  return (
    <section id="reviews" className="py-24 bg-wood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 sticky top-28">
              <h2 className="text-3xl font-bold text-white mb-6 font-serif italic">Guest Feedback</h2>
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-6xl font-bold text-orange-500">{stats.avg}</span>
                <div>
                  <div className="flex text-orange-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-gray-400 text-sm">{stats.total} total reviews</p>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {stats.counts.map((count, i) => {
                  const rating = 5 - i;
                  const percentage = (count / stats.total) * 100;
                  return (
                    <button
                      key={rating}
                      onClick={() => setFilter(filter === rating ? null : rating)}
                      className={`w-full group flex items-center space-x-3 text-left transition-all ${filter === rating ? 'scale-105 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <span className="text-gray-300 text-sm font-bold w-4">{rating}</span>
                      <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-gray-400 text-xs w-8">{count}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsFormOpen(!isFormOpen)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center space-x-2 transition-transform active:scale-95"
              >
                <Plus className="w-5 h-5" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {isFormOpen && (
              <div className="mb-12 bg-white rounded-3xl p-8 shadow-2xl border border-orange-100 animate-in slide-in-from-top duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Share Your Experience</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Your Name</label>
                      <input
                        required
                        value={newReview.author}
                        onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                        className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Rating</label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`p-2 transition-colors ${newReview.rating >= star ? 'text-orange-500' : 'text-gray-300'}`}
                          >
                            <Star className={`w-8 h-8 ${newReview.rating >= star ? 'fill-current' : ''}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest">Your Message</label>
                    <textarea
                      required
                      value={newReview.content}
                      onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                      rows={4}
                      className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500"
                      placeholder="What was the best part of your meal?"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button type="button" onClick={() => setIsFormOpen(false)} className="px-6 py-3 font-bold text-gray-500">Cancel</button>
                    <button type="submit" className="bg-orange-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-orange-700 shadow-lg">Submit Review</button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white font-serif">
                {filter ? `${filter} Star Reviews` : 'All Guest Stories'}
              </h3>
              {filter && (
                <button onClick={() => setFilter(null)} className="text-orange-500 text-sm font-bold flex items-center space-x-1 uppercase tracking-widest">
                  <X className="w-4 h-4" />
                  <span>Clear Filter</span>
                </button>
              )}
            </div>

            <div className="space-y-6">
              {filteredReviews.length > 0 ? filteredReviews.map((review) => (
                <div key={review.id} className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-orange-500/30 transition-all flex flex-col group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-400/5 px-2 py-0.5 rounded border border-orange-400/20 uppercase">
                      {review.source}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 group-hover:text-white transition-colors">
                    {highlightKeyword(review.content)}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-orange-950 border border-orange-600/30 flex items-center justify-center font-bold text-orange-500">
                      {review.author[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-sm">{review.author}</h5>
                      <p className="text-gray-500 text-[10px] uppercase tracking-widest">{review.location} • {review.date}</p>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                  <MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-400 font-medium">No reviews found for this rating yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero_bbq.png"
          alt="Barbecue Ribs Feast"
          className="w-full h-full object-cover scale-105 animate-in fade-in duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20" />
        <div className="absolute inset-0 bg-orange-950/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-6 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="h-[2px] w-12 bg-orange-500 rounded-full" />
          <Award className="text-orange-500 w-6 h-6" />
          <span className="text-orange-400 font-bold tracking-[0.3em] uppercase text-sm drop-shadow-md">Est. 1987 in Gadsden</span>
          <div className="h-[2px] w-12 bg-orange-500 rounded-full" />
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-none font-serif tracking-tight animate-in fade-in slide-in-from-bottom duration-1000 drop-shadow-2xl">
          SMOKE & <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700 italic pr-2">SOUL</span>
        </h1>

        <p className="text-xl md:text-2xl text-stone-200 mb-12 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom duration-1200 drop-shadow-lg">
          Authentic Southern BBQ, slow-smoked ribs, and the legendary burgers that have defined local flavor for 38 years.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in zoom-in duration-1500">
          <a href="#menu" className="group bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full text-lg font-bold transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.6)] hover:shadow-[0_0_60px_-10px_rgba(234,88,12,0.8)] hover:-translate-y-1 w-full sm:w-auto uppercase tracking-wider flex items-center justify-center space-x-3 ring-4 ring-orange-600/20">
            <span>View Our Menu</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="tel:2565437457" className="group bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-lg font-bold transition-all w-full sm:w-auto uppercase tracking-wider hover:border-orange-500/50">
            Place Order
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1 backdrop-blur-sm">
          <div className="w-1 h-2 bg-orange-500 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-100 rounded-full mix-blend-multiply opacity-70 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-50 rounded-full mix-blend-multiply opacity-70 animate-pulse delay-700" />
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10 aspect-[4/5] md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
                alt="Grilling BBQ"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-orange-600 text-white p-8 rounded-[2rem] shadow-2xl border-8 border-white">
              <span className="block text-5xl font-bold text-center">38</span>
              <span className="block text-xs uppercase tracking-[0.3em] font-bold text-center mt-1">Years</span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              A Gadsden Legend <br /> <span className="text-orange-600 italic font-serif underline decoration-orange-200 decoration-4 underline-offset-8">Since 1987</span>
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed italic border-l-4 border-orange-500 pl-6 py-2">
              "Located in the heart of Gadsden, AL, Merrill's BBQ has been serving up mouth-watering, authentic barbecue for over 30 years."
            </p>
            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                Renowned for our smoky ribs, tender brisket, and savory pulled pork, we offer a welcoming atmosphere and a rich culinary tradition that keeps our community coming back for more.
              </p>
              <p className="font-semibold text-gray-900">
                No frills, just fire. Our burgers are fresh, never frozen, and made to order. Come experience why Merrill's has been a community favorite for nearly four decades!
              </p>
            </div>
            <div className="pt-8 grid grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-3xl text-orange-600">38+</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">Years Tradition</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-3xl text-orange-600">10/10</h4>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">Expert Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const categories = ['BBQ Plates', 'Burgers', 'Sides'];
  const [activeTab, setActiveTab] = useState('BBQ Plates');

  return (
    <section id="menu" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-bold uppercase tracking-[0.2em] text-sm mb-2 block">Our Signature Flavors</span>
          <h2 className="text-5xl font-bold text-gray-900 font-serif italic">From the Pit to Your Plate</h2>
        </div>

        <div className="flex justify-center mb-16 space-x-2 md:space-x-4 bg-gray-100 p-2 rounded-full max-w-md mx-auto shadow-inner">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-1 px-4 md:px-8 py-3 rounded-full font-bold transition-all text-sm uppercase tracking-widest ${activeTab === cat
                  ? 'bg-orange-600 text-white shadow-xl scale-105'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU.filter(item => item.category === activeTab).map((item) => (
            <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full">
              <div className="h-72 overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 bg-orange-600 text-white font-bold px-5 py-2 rounded-2xl shadow-xl border-2 border-white/20 backdrop-blur-sm">
                  {item.price}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-600 transition-colors font-serif">{item.name}</h3>
                <p className="text-gray-500 leading-relaxed text-sm flex-grow">{item.description}</p>
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600">House Specialty</span>
                  <Plus className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-orange-950 text-white p-12 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 italic font-serif">"Wait, you said Burgers?"</h3>
            <p className="max-w-2xl mx-auto text-orange-200 text-lg leading-relaxed">
              That's right! While our BBQ is legendary, our Cheeseburgers are famous Gadsden treasures.
              Be prepared to wait 15-20 minutes—they're made fresh, never frozen, and they are well worth it!
            </p>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/10 blur-3xl -ml-32 -mb-32 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-24 flex flex-col justify-center space-y-12 relative z-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Come Get <br /><span className="text-orange-600 font-serif italic underline decoration-orange-900/50 decoration-4 underline-offset-8">Your Fill</span></h2>
                <p className="text-gray-400 text-lg leading-relaxed">We're located in the heart of Gadsden. Whether you're a local or just passing through I-59, we're your top BBQ stop.</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="bg-orange-600 p-4 rounded-3xl shadow-lg shadow-orange-600/20">
                    <MapPin className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Visit Us</h4>
                    <p className="text-gray-400">2525 Forrest Ave, Gadsden, AL 35904</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-orange-600 p-4 rounded-3xl shadow-lg shadow-orange-600/20">
                    <Clock className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Open Hours</h4>
                    <p className="text-gray-400">Mon - Fri: 10:00 am - 6:00 pm</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-orange-600 p-4 rounded-3xl shadow-lg shadow-orange-600/20">
                    <Phone className="text-white w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Call Ahead</h4>
                    <p className="text-gray-400">(256) 543-7457</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://www.google.com/maps/dir//2525+Forrest+Ave,+Gadsden,+AL+35904"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl"
                >
                  <MapPin className="w-5 h-5 transition-transform group-hover:scale-125" />
                  <span className="uppercase tracking-widest text-sm">Get Directions</span>
                </a>
              </div>
            </div>

            <div className="h-[500px] lg:h-auto relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                alt="Merrill's BBQ"
                className="w-full h-full object-cover grayscale-[0.3] contrast-[1.1] brightness-[0.8] transition-transform duration-[10s] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 bg-orange-600/5 mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-8">
              <UtensilsCrossed className="text-orange-600 w-10 h-10" />
              <span className="text-3xl font-bold tracking-tighter uppercase font-serif">Merrill's BBQ</span>
            </div>
            <p className="text-gray-400 text-lg max-w-sm mb-10 leading-relaxed">
              Serving up the heart and soul of Alabama barbecue for over 38 years. Authentic flavors, local passion, and a commitment to "fresh, never frozen."
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/5 p-4 rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="#" className="bg-white/5 p-4 rounded-2xl hover:bg-orange-600 hover:-translate-y-1 transition-all cursor-pointer">
                <span className="sr-only">Instagram</span>
                <Camera className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-orange-500 uppercase tracking-[0.3em]">Navigation</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="#gallery" className="hover:text-orange-500 transition-colors">Gallery</a></li>
              <li><a href="#menu" className="hover:text-orange-500 transition-colors">The Menu</a></li>
              <li><a href="#about" className="hover:text-orange-500 transition-colors">Our History</a></li>
              <li><a href="#reviews" className="hover:text-orange-500 transition-colors">Guest Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black mb-8 text-orange-500 uppercase tracking-[0.3em]">Quick Info</h4>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 text-orange-600 mt-1 shrink-0" />
                <span className="leading-relaxed">2525 Forrest Ave, Gadsden, Alabama 35904</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-orange-600 shrink-0" />
                <span className="font-bold text-white text-lg">(256) 543-7457</span>
              </li>
              <li className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-orange-600 mt-1 shrink-0" />
                <span>Mon-Fri: 10:00am - 6:00pm<br />Sat-Sun: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs tracking-widest uppercase font-bold">
          <p>© {new Date().getFullYear()} Merrill's BBQ Gadsden. Established 1987.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-orange-500 selection:text-white">
      <Navbar />
      <Hero />
      <GallerySection />
      <MenuSection />
      <ReviewsSection />
      <About />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;
