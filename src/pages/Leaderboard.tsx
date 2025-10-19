import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, username: "ML_Master_2024", score: 0.9876, submissions: 142, tier: "Grandmaster" },
    { rank: 2, username: "DataWizard", score: 0.9854, submissions: 128, tier: "Grandmaster" },
    { rank: 3, username: "AIEnthusiast", score: 0.9823, submissions: 115, tier: "Master" },
    { rank: 4, username: "CodeNinja", score: 0.9801, submissions: 98, tier: "Master" },
    { rank: 5, username: "DeepLearner", score: 0.9789, submissions: 87, tier: "Master" },
    { rank: 6, username: "PythonPro", score: 0.9765, submissions: 76, tier: "Expert" },
    { rank: 7, username: "DataScience_Fan", score: 0.9742, submissions: 65, tier: "Expert" },
    { rank: 8, username: "TensorFlow_Ace", score: 0.9718, submissions: 54, tier: "Expert" },
    { rank: 9, username: "KaggleKing", score: 0.9695, submissions: 43, tier: "Contributor" },
    { rank: 10, username: "AlgoExpert", score: 0.9672, submissions: 38, tier: "Contributor" },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Grandmaster": return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white";
      case "Master": return "bg-gradient-to-r from-purple-500 to-pink-500 text-white";
      case "Expert": return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white";
      case "Contributor": return "bg-gradient-to-r from-green-500 to-emerald-500 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-orange-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Competition Leaderboard</h1>
          <p className="text-muted-foreground">
            Top performers in the House Price Prediction Challenge
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Rankings</CardTitle>
            <CardDescription>
              Updated in real-time • Showing top 10 competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((entry) => (
                  <TableRow key={entry.rank} className="hover:bg-muted/50">
                    <TableCell className="font-bold">
                      <div className="flex items-center space-x-2">
                        {getRankIcon(entry.rank)}
                        <span>{entry.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{entry.username}</TableCell>
                    <TableCell>
                      <span className="font-mono text-accent font-semibold">
                        {entry.score.toFixed(4)}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{entry.submissions}</TableCell>
                    <TableCell>
                      <Badge className={getTierColor(entry.tier)}>
                        {entry.tier}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
