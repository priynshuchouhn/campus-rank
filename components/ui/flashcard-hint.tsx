import React from 'react'
import { useMediaQuery } from "usehooks-ts"
import { Badge } from './badge'
import { HelpCircle } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

function FlashcardHint({hint}:{hint:string}) {

const isMobile = useMediaQuery("(max-width: 768px)")

return (
  isMobile ? (
    <Popover>
      <PopoverTrigger>
        <Badge variant="warning">
          <HelpCircle className="me-2 h-4 w-4" /> Hint
        </Badge>
      </PopoverTrigger>
      <PopoverContent>
        {hint}
      </PopoverContent>
    </Popover>
  ) : (
    <Tooltip>
      <TooltipTrigger>
        <Badge variant="warning">
          <HelpCircle className="me-2 h-4 w-4" /> Hint
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        {hint}
      </TooltipContent>
    </Tooltip>
  )
)

}

export default FlashcardHint
