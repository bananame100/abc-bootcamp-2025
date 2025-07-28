def generate_numbers_1(max_number:int):
    print("generate_numbers_1 함수 호출")
    numbers=[]
    for i in range(1,max_number+1):
        numbers.append(i)
    return numbers

def generate_numbers_2(max_number:int):
    print("generate_numbers_2 함수 호출")
    for i in range(1,max_number+1):
        yield i

numbers_1=generate_numbers_1(10)
numbers_2=generate_numbers_2(10)
print(numbers_1)


gen1=(i**2 for i in numbers)


def make_numbers():
    for i in [1,2,3,4,5]:
        yield i
gen2 = make_numbers()

#gen1과 gen2는 같은 코드