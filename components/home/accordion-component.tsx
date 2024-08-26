import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionComponent() {
    return (
        <div className="flex flex-col w-[70%] lg:w-[50%]">
            <h2 className="scroll-m-20 pb-[3rem] text-center text-3xl font-semibold tracking-tight lg:text-4xl">
                Frequently Asked Questions (FAQs)
            </h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger><span className="text-xl font-semibold">Do I need card or should I be premium user to access all features?</span></AccordionTrigger>
                    <AccordionContent>
                        <p>No, this page isn&apos;t even a need to create a premium account, it&apos;s completely free</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}