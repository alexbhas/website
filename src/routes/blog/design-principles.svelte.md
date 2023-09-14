---
title: Reviewing the Design Principles for Computer Security
created: 2023-09-14T00:00:00
summary: 'Revewing the design principles found in Computer Security and the Internet: Tools and Jewels from Malware to Bitcoin, Second Edition'
tags: [cybersecurity]
---

<script context="module">
  import { load } from "./_load"
  export { load }
</script>

One of my favourite courses during my degree was COMP4108: Computer Systems Security. A lot of what I learned in this course
revolved around the security principles found in the textbook [Computer Security and the Internet: Tools and Jewels from Malware to Bitcoin, Second Edition](https://people.scs.carleton.ca/~paulv/toolsjewels.html). In section 1.7, there is a list of 20 design principles, as well as 2 higher-level principles, that that serve as a guideline for how systems should be designed with security in mind.
I believe these principles are very important and all of them should be taken into account.

Below are the 20 design principles:

1. **P1 SIMPLICITY-AND-NECESSITY**: Keep designs as simple and small as possible. Reduce the number of components used, retaining only those that are essential; minimize functionality, favor minimal installs, and disable unused functionality. Economy and frugality in design—especially for core security mechanisms—simplifies
analysis and reduces errors and oversights. Configure initial deployments to have
non-essential services and applications disabled by default (related to P2).
NOTE. This principle among others supports another broad principle: minimizing
attack surface. Every interface that accepts external input or exposes programmatic
functionality provides an entry point for an attacker to change or acquire a program
control path (e.g., install code or inject commands for execution), or alter data that might do likewise. The goal is to minimize the number of interfaces, simplify their
design (to reduce the number of ways they might be abused), minimize external access to them, and restrict such access to authorized parties. Importantly, security
mechanisms themselves should not introduce new exploitable attack surfaces.

2. **P2 SAFE-DEFAULTS**: Use safe default settings (beware, defaults often go unchanged).
For access control, deny-by-default. Design services to be fail-safe, here meaning
that when they fail, they fail “closed” (e.g., denying access). As a method, use explicit
inclusion via allowlists (goodlists) of authorized entities with all others denied, rather
than exclusion via denylists (badlists) that would allow all those unlisted.
NOTE. A related idea, e.g., for data sent over real-time links, is to encrypt by
default using opportunistic encryption—encrypting session data whenever supported
by the receiving end. In contrast, default encryption is not generally recommended in
all cases for stored data, as the importance of confidentiality must be weighed against
the complexity of long-term key management and the risk of permanent loss of data
if encryption keys are lost; for session data, immediate decryption upon receipt at the
endpoint recovers cleartext.

3. **P3 OPEN-DESIGN**: Do not rely on secret designs, attacker ignorance, or security by obscurity. Invite and encourage open review and analysis. For example, the Advanced
Encryption Standard was selected from a set of public candidates by open review;
undisclosed cryptographic algorithms are now widely discouraged. Without contradicting this, leverage unpredictability where advantageous, as arbitrarily publicizing
tactical defense details is rarely beneficial (there is no gain in advertising to thieves
that you are on vacation, or posting house blueprints); and beware exposing error
messages or timing data that vary based on secret values, lest they leak the secrets.
NOTE. P3 is often paired with P9, and follows Kerckhoffs’ principle—a system’s
security should not rely on the secrecy of its design details.

4. **P4 COMPLETE-MEDIATION**: For each access to every object, and ideally immediately
before the access is to be granted, verify proper authority. Verifying authorization
requires authentication (corroboration of an identity), checking that the associated
principal is authorized, and checking that the request has integrity (it must not be
modified after being issued by the legitimate party—cf. P19).

5. **P5 ISOLATED-COMPARTMENTS**: Compartmentalize system components using strong
isolation structures (containers) that manage or prevent cross-component communication, information leakage, and control. This limits damage when failures occur,
and protects against escalation of privileges; P6 and P7 have similar motivations. Restrict authorized cross-component communication to observable paths
with defined interfaces to aid mediation, screening, and use of chokepoints. Examples of containment means include: process and memory isolation, disk partitions,
virtualization, software guards, zones, gateways and firewalls.
NOTE. Sandbox is a term used for mechanisms offering some form of isolation

6. **P6 LEAST-PRIVILEGE**: Allocate the fewest privileges needed for a task, and for the
shortest duration necessary. For example, retain superuser privileges only for actions requiring them; drop and reacquire privileges if needed later. Do not
use a Unix root account for tasks where regular user privileges suffice. This reduces
exposure, and limits damage from the unexpected. P6 complements P5 and P7.
NOTE. This principle is related to the military need-to-know principle—access to
sensitive information is granted only if essential to carrying out one’s official duties.

7. **P7 MODULAR-DESIGN**: Avoid monolithic designs that embed full privileges into large
single components; favor object-oriented and finer-grained designs that segregate
privileges (including address spaces) across smaller units or processes. P6 guides
more on the use of privilege frameworks, P7 more on designing base architectures.
NOTE. A related financial accounting principle is separation of duties, whereby codependent tasks are assigned to independent parties so that an insider attack requires
collusion. This also differs from requiring multiple authorizations from distinct parties (e.g., two keys or signatures to open a safety-deposit box or authorize largedenomination cheques), a generalization of which is thresholding of privileges—
requiring k of t parties (2 ≤ k ≤ t) to authorize an action.


8. **P8 SMALL-TRUSTED-BASES**: Strive for small code size in components that must be
trusted, i.e., components on which a larger system strongly depends for security. For
example, high-assurance systems centralize critical security services in a minimal
core operating system microkernel, whose smaller size allows efficient concentration of security analysis.
NOTE. A related minimize-secrets principle is: Secrets should be few in number.
Benefits include reducing management complexity. Cryptographic algorithms use a
different form of trust reduction, and separate mechanism from secret; note that a
secret key is changeable at far less cost than the cryptographic algorithm itself.


9. **P9 TIME-TESTED-TOOLS**: Rely wherever possible on time-tested, expert-built security
tools including protocols, cryptographic primitives and toolkits, rather than designing
and implementing your own. History shows that security design and implementation
is difficult to get right even for experts; thus amateurs are heavily discouraged (don’t
reinvent a weaker wheel). Confidence increases with the length of time mechanisms
and tools have survived under load (sometimes called soak testing).
NOTE. The underlying reasoning here is that a widely used, heavily scrutinized
mechanism is less likely to retain flaws than many independent, scantly reviewed implementations (cf. P3). Thus using well-known crypto libraries (e.g., OpenSSL) is
encouraged. Less understood is an older least common mechanism principle: minimize the number of mechanisms (shared variables, files, system utilities) shared by
two or more programs and depended on by all. It recognizes that interdependencies
increase risk; code diversity can reduce impacts of single flaws.

10. **P10 LEAST-SURPRISE**: Design mechanisms, and their user interfaces, to behave as users
expect. Align designs with users’ mental models of their protection goals, to reduce
user mistakes that compromise security. Especially where errors are irreversible (e.g.,
sending confidential data or secrets to outside parties), tailor to the experience of
target users; beware designs suited to experts but triggering mistakes by ordinary users. Simpler, easier-to-use (i.e., usable) mechanisms yield fewer surprises.

11. **P11 USER-BUY-IN**: Design security mechanisms that users are motivated to use rather
than bypass, and so that users’ path of least resistance is a safe path. Seek design
choices that illuminate benefits, improve user experience, and minimize inconvenience. Mechanisms viewed as time-consuming, inconvenient or without perceived
benefit risk non-compliance. Example: a subset of Google gmail users voluntarily
use a two-step authentication scheme, which augments basic passwords by one-time
passcodes sent to the user’s phone.

12. **P12 SUFFICIENT-WORK-FACTOR**: For configurable security mechanisms where the probability of attack success increases predictably with effort, tune the mechanism so that
the cost to defeat it (work factor) clearly exceeds the resources of anticipated classes
of adversaries. Thus use suitably strong defenses. Example 1: random cryptographic
keys should be sufficiently long to preclude being found by brute-force search (i.e.,
enumerative guessing attacks). Example 2: disallow user-chosen passwords that are
so weak that a feasible number of guesses yields a non-negligible chance of success.

13. **P13 DEFENSE-IN-DEPTH**: Build defenses in multiple layers backing each other up, forcing attackers to defeat independent layers, thereby avoiding single points of failure. If
any layer relies on alternative defense segments, design each to be comparably strong
(“equal-height fences” for defence-in-breadth) and strengthen the weakest segment
first (smart attackers jump the lowest bar or break the weakest link). As a design assumption, expect some defenses to fail on their own due to errors, and that attackers
will defeat others more easily than anticipated, or entirely bypass them.

14. **P14 EVIDENCE-PRODUCTION**: Record system activities through event logs, monitoring
tools, and other means to promote accountability, help understand and recover from
system failures, and support intrusion detection tools. Example: robust audit trails
support forensic analysis tools, to help reconstruct events related to intrusions and
criminal activities. In many cases, mechanisms that facilitate detection and evidence
production may be more cost-effective than outright attack prevention.

15. **P15 DATATYPE-VALIDATION**: Verify that all received data meets expected (assumed)
properties or data types. If data input is expected, ensure that it cannot be processed
as code by subsequent components. This may involve canonicalization of data (e.g.,
of fragmented packets or encoded URL characters) and broader input sanitization.

16. **P16 REMNANT-REMOVAL**: On termination of a session or program, remove all traces of
sensitive data associated with a task, including secret keys and any remnants recoverable from secondary storage, RAM and cache memory. Note that common file
deletion removes directory entries, whereas secure deletion aims to make file content
unrecoverable even by forensic tools. Related to remnant removal, beware that while
a process is active, information may leak elsewhere by side channels.

17. **P17 TRUST-ANCHOR-JUSTIFICATION**: Ensure or justify confidence placed in any base
point of assumed trust, especially when mechanisms iteratively or transitively extend trust from a base point. More generally, verify trust assumptions where possible, with extra diligence at
registration, initialization, software installation, and starting points in the lifecycle of
a software application, security key or credential.

18. **P18 INDEPENDENT-CONFIRMATION**: Use simple, independent (e.g., local device) crosschecks to increase confidence in code or data, especially if it may arrive from outside
domains or over untrusted channels. Example: integrity of downloaded software applications or public keys can be confirmed by comparing a locally computed cryptographic hash of the item to a “known-good” hash obtained
over an independent channel (voice call, text message, widely trusted site).


19. **P19 REQUEST-RESPONSE-INTEGRITY**: Verify that responses match requests in name resolution and other distributed protocols. Their design should include cryptographic
integrity checks that bind steps to each other within a given transaction or protocol
run to detect unrelated or substituted responses; beware protocols lacking authentication. Example: a certificate request specifying a unique subject name or domain
expects in response a certificate for that subject; this field in the response certificate
should be cross-checked against the request.

20. **P20 RELUCTANT-ALLOCATION**: Be reluctant to allocate resources or expend effort in
interactions with unauthenticated, external agents. For services open to all parties,
design to mitigate intentional resource consumption. Place a higher burden of effort
on agents that initiate an interaction. (A party initiating a phone call should not be
the one to demand: Who are you? When possible, authenticate. Related: processes
should beware abuse as a conduit extending their privileges to unverified agents.)
NOTE. P20 largely aims to avoid denial of service attacks. P3 also
recommends reluctance, in that case to releasing system data useful to attackers.

21. **HP1 SECURITY-BY-DESIGN**: Build security in, starting at the initial design stage of a
development cycle, since secure design often requires core architectural support absent if security is a late-stage add-on. Explicitly state the design goals of security
mechanisms and what they are not designed to do, since it is impossible to evaluate
effectiveness without knowing goals. In design and analysis documents, explicitly
state all security-related assumptions, especially related to trust and trusted parties
(supporting P17); note that a security policy itself might not specify assumptions.

22. **HP2 DESIGN-FOR-EVOLUTION**: Design base architectures, mechanisms, and protocols
to support evolution, including algorithm agility for graceful upgrades of crypto
algorithms (e.g., encryption, hashing) with minimal impact on related components.
Support automated secure software update where possible. Regularly re-evaluate
the effectiveness of security mechanisms, in light of evolving threats, technology,
and architectures; be ready to update designs and products as needed.

An important note that is present throughout all of these principles is to **VERIFY FIRST**.
Overall, I have learned a lot from these principles and find it fun to analyze different systems under the lens of these principles.