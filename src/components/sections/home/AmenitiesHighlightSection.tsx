import {
  Wifi, Car, Utensils, Waves, Dumbbell, Wind,
  Coffee, Shield, Clock, Baby, TreePine, Sparkles
} from 'lucide-react'

const amenities = [
  { icon: Wifi,      label: 'Free Wi-Fi',        desc: 'High-speed in all rooms'     },
  { icon: Car,       label: 'Free Parking',       desc: 'Secure on-site parking'      },
  { icon: Utensils,  label: 'Restaurant',         desc: 'Filipino & international'    },
  { icon: Waves,     label: 'Swimming Pool',      desc: 'Open 6am – 10pm daily'       },
  { icon: Dumbbell,  label: 'Fitness Center',     desc: 'Modern equipment'            },
  { icon: Wind,      label: 'Air Conditioning',   desc: 'Climate-controlled rooms'    },
  { icon: Coffee,    label: 'Breakfast Included', desc: 'Fresh daily buffet'          },
  { icon: Shield,    label: '24/7 Security',      desc: 'Your safety is our priority' },
  { icon: Clock,     label: '24/7 Front Desk',    desc: 'Always here to help'         },
  { icon: Baby,      label: 'Family Friendly',    desc: 'Kids welcome & catered for'  },
  { icon: TreePine,  label: 'Garden & Terrace',   desc: 'Relax in nature'             },
  { icon: Sparkles,  label: 'Daily Housekeeping', desc: 'Fresh rooms every day'       },
]

export default function AmenitiesHighlightSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="section-wrapper">

        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="section-label">Amenities</p>
          <h2 className="section-heading">
            Everything You Need
          </h2>
          <p className="section-subheading mx-auto text-center">
            We've thought of everything so you can focus on
            enjoying your stay.
          </p>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {amenities.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 flex flex-col gap-3
                         border border-gray-100 hover:border-blue-100
                         hover:shadow-soft transition-all duration-200 group"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center
                           bg-blue-50 group-hover:bg-blue-100 transition-colors duration-200"
              >
                <Icon size={18} className="text-blue-500" />
              </div>

              {/* Text */}
              <div>
                <p
                  className="text-sm font-semibold text-gray-800 mb-0.5"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {label}
                </p>
                <p
                  className="text-xs text-gray-400 leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="text-center text-sm text-gray-400 mt-10"
          style={{ fontFamily: 'var(--font-accent)' }}
        >
          All amenities included with every room booking.
        </p>

      </div>
    </section>
  )
}