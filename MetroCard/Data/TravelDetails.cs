using System.Runtime.CompilerServices;

namespace MetroCard.Data;

public class TravelDetails
{

    public int TravelID{get;set;}

    public int CardNumber{get;set;} 

    public string FromLocation{get;set;}

    public string ToLocation{get;set;}

    public string Date{get;set;}

    public double TravelCost{get;set;}

}