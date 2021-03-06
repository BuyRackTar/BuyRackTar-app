package com.buyracktar.api.security.jwtutils;

import com.buyracktar.api.entities.Account;
import com.buyracktar.api.entities.User;
import com.buyracktar.api.services.AccountService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class TokenManager implements Serializable {
	private static final long serialVersionUID = 7008375124389347049L;
	private static final long TOKEN_VALIDITY = 10 * 60;
	private static final long REFRESH_TOKEN_VALIDITY = 182 * 24 * 60 * 60;
	@Value("${secret}")
	private String jwtSecret;
	public String generateJwtToken(UserDetails userDetails) {
		return generateJwtTokenByTime(TOKEN_VALIDITY, userDetails);
	}

	public String generateJwtRefreshToken(UserDetails userDetails) {
		return generateJwtTokenByTime(REFRESH_TOKEN_VALIDITY, userDetails);
	}

	private String generateJwtTokenByTime(long tokenValidityTime, UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		Account account = (Account) userDetails;
		return Jwts.builder().setClaims(claims).setSubject(userDetails.getUsername()).claim("id",account.getId())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + tokenValidityTime * 1000))
				.signWith(SignatureAlgorithm.HS512, jwtSecret).compact();
	}

	public Boolean validateJwtToken(String token, UserDetails userDetails) {
		String username = getUsernameFromToken(token);
		Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		Boolean isTokenExpired = claims.getExpiration().before(new Date());
		return (username.equals(userDetails.getUsername()) && !isTokenExpired);
	}
	public String getUsernameFromToken(String token) {
		final Claims claims = Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody();
		return claims.getSubject();
	}
}
