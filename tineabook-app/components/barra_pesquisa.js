import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import Pesquisa from "../../app-tineabook/screens/*Search";
	
function barra_pesquisa() {
  return (
    <Input>
          <InputSlot className='pl-3'>
            <InputIcon as={SearchIcon}/>
          </InputSlot>
          <InputField
            placeholder="Search..."
          />
        </Input>
  );
}

export default barra_pesquisa;