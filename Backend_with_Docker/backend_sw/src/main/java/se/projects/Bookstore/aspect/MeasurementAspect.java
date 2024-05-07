package se.projects.Bookstore.aspect;

import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Order(0)
@Component
public class MeasurementAspect {

    Logger log = LoggerFactory.getLogger(LoggingAspect.class);
    // Advice==> (Around) code execute before and after method call
    // PointCut ==> se.projects.Bookstore.service..*(..))
    // Target Object ==> joinPoint
    @Around(value = "execution(* se.projects.Bookstore.service..*(..))") // any method behind service with any parameter
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable{

        long startTime = System.currentTimeMillis();
        StringBuilder sb = new StringBuilder("KPI:");
        sb.append("[").append(joinPoint.getKind()).append("]\tfor: ").append(joinPoint.getSignature()) // print the name of the method that he's working on it
                .append("\twithArgs: ").append("(").append(StringUtils.join(joinPoint.getArgs(), ",")).append(")");  // parameter of the methods
        sb.append("\ttook: ");
        Object returnValue = joinPoint.proceed();
        log.info(sb.append(System.currentTimeMillis() - startTime).append(" ms.").toString());

        return returnValue;
    }


}
