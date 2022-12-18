import Link from 'next/link'
import React from 'react'

function MobileNav() {
  return (
    <div>
          <div id="menu" className="hidden">
            <div>
              <div>
                <Link
                  className="hover:underline"
                  href="/category/[id]"
                  as="/category/gpu"
                >
                  gpu
                </Link>
              </div>
              <div>
                <Link
                  className="hover:underline"
                  href="/category/[id]"
                  as="/category/processors"
                >
                  processors
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}

export default MobileNav