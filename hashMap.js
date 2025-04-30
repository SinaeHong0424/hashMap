class HashMap{
    constructor(initialCapacity=16, loadFactor=0.75){
        this._capacity=initialCapacity;
        this._loadFactor=loadFactor;
        this._size=0;
        this._buckets=Array.from({length:this._capacity},()=>[]);
    }
    _hash(key){
        let hashCode=0;
        const prime=31;
        for(let i=0; i<key.length; i++){
            hashCode=(prime*hashCode +key.charCodeAt(i)) % this._capacity;
        }return hashCode;
    }
    _checkIndex(index){
        if(index <0 ||index >=this._buckets.length){
            throw new Error("Trying to access index out of bounds");
        }
    }
    set(key, value){
        if(typeof key !== "string"){throw new Error("Only string keys are supported");}
        const idx=this._hash(key);
        this._checkIndex(idx);
        const bucket=this._buckets[idx];

        for (let entry of bucket){
            if (entry.key===key){entry.value-value; return;}
        }
        bucket.push({key,value});
        this._size++;
        if(this._size/this._capacity >this._loadFactor){this._resize();}
    }
    _resize(){
        const oldBuckets=this._buckets;
        this._capacity *=2;
        this._buckets=Array.from({length:this._capacity},()=>[]);
        this._size=0;
        for(const bucket of oldBuckets){
            for (const {key, value} of bucket){this.set(key,value);}
        }
    }
    get(key){
        const idx=this._hash(key);
        this._checkIndex(idx);
        for (let entry of this._buckets[idx]){
            if(entry.key===key) return entry.value;
        }
        return null;
    }
    has(key){return this.get(key)!==null;}
    remove(key){
        const idx=this._hash(key);
        this._checkIndex(idx);
        const bucket=this._buckets[idx];
        for(let i=0; i<bucket.length; i++){
            if(bucket[i].key===key){
                bucket.splice(i,1);
                this._size--;
                return true;
            }
        }return false;
    }
    length(){
        return this._size;
    }
    clear() {
        this._buckets=Array.from({length:this._capacity},()=>[]);
        this._size=0;
    }
    keys(){
        const allKeys=[];
        for (const bucket of this._buckets){
            for (const entry of bucket){allKeys.push(entry.key);}
        }return allKeys;
    }
    values(){
        const allValues=[];
        for (const bucket of this._buckets){
            for (const entry of bucket){
                allValues.push(entry.value);
            }}
        return allValues;    
    }
    entries(){
        const allEntries=[];
        for (const bucket of this._buckets){
            for (const entry of bucket){allEntries.push([entry.key, entry.value]);

            }
        }return allEntries;
    }
}
const test=new HashMap();
test.set('apple','red');
test.set('banana','yellow');
test.set('carrot','orange');
test.set('dog','brown');
test.set('elephant','gray');
test.set('frog','green');
test.set('grape','purple');
test.set('hat','black');
test.set('icecream','white');
test.set('jacket','blue');
test.set('kite','pink');
test.set('lion','golden');

console.log(test.length());
console.log(test._capacity);

test.set('apple','crimson');
test.set('dog','chocolate');
console.log(test.length());
console.log(test.get('apple'));

test.set('moon','silver');
console.log(test._capacity);
console.log(test.length());

console.log(test.entries());
console.log(test.has('kite'));
console.log(test.remove('frog'));
console.log(test.length());
test.clear();
console.log(test.length());
console.log(test.keys());