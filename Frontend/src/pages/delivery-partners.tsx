import { IconTruck } from "@tabler/icons-react"

export default function DeliveryPartners() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
      <IconTruck size={48} stroke={1} />
      <h1 className="text-2xl font-semibold text-foreground">Delivery Partners</h1>
      <p>Manage delivery partners here.</p>
    </div>
  )
}
