package de.neuefische.backend.security;
import de.neuefische.backend.model.MongoUser;
import de.neuefische.backend.repository.MongoUserRepo;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MongoUserDetailsService implements UserDetailsService {
    private final MongoUserRepo repo;

    public MongoUserDetailsService(MongoUserRepo repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser user = repo.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Bad Info"));

        return new User(
                user.username(),user.password(), List.of());
    }
}
