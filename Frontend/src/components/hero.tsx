import { IconArrowRight, IconLeaf } from "@tabler/icons-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const Hero = () => {
  return (
    <section className="mt-20  max-w-full w-full">
      <Card className="max-w-7xl py-20  h-[500px] w-full relative overflow-hidden bg-transparent border-0 ">
        <CardContent className="relative z-10 p-10">
          <div className="flex flex-col gap-8">
            <Badge variant={'outline'} className="w-fit text-white">
              <IconLeaf className="mr-1" /> Farm-Fresh & Organic
            </Badge>
            <h1 className="text-5xl font-medium leading-13 tracking-tight text-white font-heading">
              Nourish your home <br /> with Earth's finest
            </h1>
            <p className="text-md max-w-md text-white/90">
              Fresh, organic groceries delivered from local farms to your
              doorstep. Quality you can taste, convenience you deserve.
            </p>
            <div className="flex items-center justify-start gap-2">
              <Button>
                Shop Now <IconArrowRight className="ml-1" />
              </Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white">
                Browse Categories
              </Button>
            </div>
          </div>
        </CardContent>

       {/* Background image + gradient overlay */}
<div className="absolute inset-0">
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: 'url("/Images/hero-image.jpeg")' }}
  />
  {/* Rendered after image in DOM = naturally on top */}
  <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 via-100% to-transparent" />
</div>  
      </Card>
    </section>
  )
}

export default Hero