"use client"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import { Button } from "./ui/button"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSearchedQuery } from "@/redux/jobSlice"
import { Briefcase } from "lucide-react"

const category = ["Frontend Developer", "Backend Developer", "Data Science", "Graphic Designer", "FullStack Developer"]

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  return (
    <div className="bg-gradient-to-r from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Popular <span className="text-teal-500">Categories</span>
          </h2>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Explore job opportunities in these trending categories
          </p>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {category.map((cat, index) => (
              <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Button
                    onClick={() => searchJobHandler(cat)}
                    variant="outline"
                    className="w-full rounded-full border-teal-200 hover:border-teal-500 hover:bg-teal-50 hover:text-teal-700 transition-all py-6 text-slate-700 group"
                  >
                    <Briefcase className="w-4 h-4 mr-2 text-teal-500 group-hover:text-teal-700" />
                    {cat}
                  </Button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700" />
          <CarouselNext className="bg-white border-teal-200 hover:bg-teal-50 hover:border-teal-300 text-teal-700" />
        </Carousel>
      </div>
    </div>
  )
}

export default CategoryCarousel
