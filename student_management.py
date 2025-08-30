class Student :
    def __init__(self,name,mark):
        self._name = name
        self._mark = mark

    def setmark(self,mark):
        if mark < 0:
            print("mark cannot be negative")
        else:
            self._mark =mark

    def getmark(self):
        return self._mark
    
    def display(self):
        print("name:",self._name)
        print("mark:",self._mark)

class GraduateStudent(Student):
    def __init__(self,name,mark,researchtopic):
        super().__init__(name,mark)
        self.researchtopic = researchtopic

    def display(self):
        super().display()
        print("researchtopic",self.researchtopic)

s1=Student("alice",90)
s1.display()

# researchtopic

s2 = GraduateStudent("bob",100,"cse")
s2.display()  